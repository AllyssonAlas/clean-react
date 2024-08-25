import { Router } from 'react-router-dom'
import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'
import { createMemoryHistory } from 'history'

import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'
import { InvalidCredentialsError } from '@/domain/errors'

const history = createMemoryHistory({ initialEntries: ['/login'] })

const populateInput = (field: string): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value: `any_${field}` } })
}

const simulateValidSubmit = async (): Promise<void> => {
  populateInput('email')
  populateInput('password')
  await fireEvent.submit(screen.getByTestId('form'))
}

describe('Login Page', () => {
  let validation: MockProxy<Validation>
  let saveAccessToken: jest.Mock
  let authentication: jest.Mock

  beforeAll(() => {
    validation = mock<Validation>()
    saveAccessToken = jest.fn().mockResolvedValue(undefined)
    authentication = jest.fn().mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    validation.validate.mockReturnValue(undefined)
    render(
      <Router location={history.location} navigator={history}>
        <Login authentication={authentication} saveAccessToken={saveAccessToken} validation={validation} />
      </Router>,
    )
  })

  afterEach(cleanup)

  it('Should start with initial state', async () => {
    validation.validate.mockReturnValue('validation_error')
    cleanup()
    render(
      <Router location={history.location} navigator={history}>
        <Login authentication={authentication} saveAccessToken={saveAccessToken} validation={validation} />
      </Router>,
    )

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
    validation.validate.mockReturnValue('validation_error')

    populateInput('email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('validation_error')
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('Should show password error if validation fails', async () => {
    validation.validate.mockReturnValue('validation_error')

    populateInput('password')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('validation_error')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should show valid email state if validation succeeds', () => {
    populateInput('email')

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('Should show valid password state if validation succeeds', () => {
    populateInput('password')

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('Should enable submit button if form is valid', () => {
    populateInput('email')
    populateInput('password')

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    simulateValidSubmit()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('Should call Authentication with correct input', () => {
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
    simulateValidSubmit()
    simulateValidSubmit()

    expect(authentication).toHaveBeenCalledTimes(1)
  })

  it('Should not call Authentication if form is invalid', () => {
    validation.validate.mockReturnValue('validation_error')

    simulateValidSubmit()

    expect(authentication).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const error = new InvalidCredentialsError()
    authentication.mockRejectedValueOnce(error)

    simulateValidSubmit()

    const errorWrap = await screen.findByTestId('error-wrap')
    const mainError = screen.getByTestId('main-error')
    expect(errorWrap.childElementCount).toBe(1)
    expect(mainError.textContent).toBe(error.message)
  })

  it('Should call SaveAccessToken on success', async () => {
    await simulateValidSubmit()

    expect(saveAccessToken).toHaveBeenCalledWith({ token: 'any_access_token' })
    expect(saveAccessToken).toHaveBeenCalledTimes(1)
  })

  it('Should present error if SaveAccessToken fails', async () => {
    const error = new InvalidCredentialsError()
    saveAccessToken.mockRejectedValueOnce(error)

    simulateValidSubmit()

    const errorWrap = await screen.findByTestId('error-wrap')
    const mainError = await screen.findByTestId('main-error')
    expect(errorWrap.childElementCount).toBe(1)
    expect(mainError.textContent).toBe(error.message)
  })

  it('Should got to Signup page', async () => {
    fireEvent.click(screen.getByTestId('signup'))

    expect(history.location.pathname).toBe('/signup')
    expect(history.index).toBe(1)
  })
})
