import { Router } from 'react-router-dom'
import { render, fireEvent, cleanup, screen, waitFor } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'
import { createMemoryHistory } from 'history'
import 'jest-localstorage-mock'

import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'
import { InvalidCredentialsError } from '@/domain/errors'

type SutTypes = {
  authentication: jest.Mock
  validation: MockProxy<Validation>
}

const history = createMemoryHistory({ initialEntries: ['/login'] })

const makeSut = (error?: string): SutTypes => {
  const validation = mock<Validation>()
  validation.validate.mockReturnValue(error)
  const authentication = jest.fn().mockResolvedValue({ accessToken: 'any_access_token' })
  render(
    <Router location={history.location} navigator={history}>
      <Login authentication={authentication} validation={validation} />
    </Router>,
  )
  return { authentication, validation }
}

const populateInput = (field: string): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value: `any_${field}` } })
}

const simulateValidSubmit = (): void => {
  populateInput('email')
  populateInput('password')
  const submitButton = screen.getByTestId('submit')
  fireEvent.submit(submitButton)
}

describe('Login Page', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    makeSut('validation_error')
    const errorWrap = screen.getByTestId('error-wrap')
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    const emailStatus = screen.getByTestId('email-status')
    const passwordStatus = screen.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe('validation_error')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('validation_error')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should show email error if validation fails', () => {
    makeSut('validation_error')

    populateInput('email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('validation_error')
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('Should show password error if validation fails', () => {
    makeSut('validation_error')

    populateInput('password')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('validation_error')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should show valid email state if validation succeeds', () => {
    makeSut()

    populateInput('email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('Should show valid password state if validation succeeds', () => {
    makeSut()

    populateInput('password')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()
    populateInput('email')
    populateInput('password')

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    makeSut()

    simulateValidSubmit()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('Should call Authentication with correct input', () => {
    const { authentication } = makeSut()

    simulateValidSubmit()

    expect(authentication).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'any_email',
        password: 'any_password',
      }),
    )
    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('Should call Authentication only once', () => {
    const { authentication } = makeSut()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('Should not call Authentication if form is invalid', () => {
    const { authentication } = makeSut('validation_error')

    populateInput('email')
    fireEvent.submit(screen.getByTestId('form'))

    expect(authentication).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { authentication } = makeSut()
    const error = new InvalidCredentialsError()
    authentication.mockRejectedValueOnce(error)

    simulateValidSubmit()

    const errorWrap = screen.getByTestId('error-wrap')
    await waitFor(() => errorWrap)
    const mainError = screen.getByTestId('main-error')
    expect(errorWrap.childElementCount).toBe(1)
    expect(mainError.textContent).toBe(error.message)
  })

  it('Should add accessToken to localStorage on success', async () => {
    makeSut()

    simulateValidSubmit()
    await waitFor(() => screen.getByTestId('form'))

    expect(localStorage.setItem).toHaveBeenCalledWith('accessToken', 'any_access_token')
    expect(history.location.pathname).toBe('/')
    expect(history.index).toBe(0)
  })

  it('Should got to Signup page', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('signup'))

    expect(history.location.pathname).toBe('/signup')
    expect(history.index).toBe(1)
  })
})
