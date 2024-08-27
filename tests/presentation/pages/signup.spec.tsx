import { Router } from 'react-router-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'
import { createMemoryHistory } from 'history'

import { EmailInUseError } from '@/domain/errors'
import { SignUp } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const populateInput = (field: string): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value: `any_${field}` } })
}

const simulateValidSubmit = async (): Promise<void> => {
  populateInput('name')
  populateInput('email')
  populateInput('password')
  populateInput('passwordConfirmation')
  await fireEvent.submit(screen.getByTestId('form'))
}

describe('Signup Page', () => {
  let validation: MockProxy<Validation>
  let saveAccessToken: jest.Mock
  let addAccount: jest.Mock

  beforeAll(() => {
    validation = mock<Validation>()
    saveAccessToken = jest.fn().mockResolvedValue(undefined)
    addAccount = jest.fn().mockResolvedValue({ accessToken: 'any_access_token' })
  })

  beforeEach(() => {
    validation.validate.mockReturnValue(undefined)
    render(
      <Router location={history.location} navigator={history}>
        <SignUp addAccount={addAccount} saveAccessToken={saveAccessToken} validation={validation} />
      </Router>,
    )
  })

  afterEach(cleanup)

  it('Should start with initial state', async () => {
    validation.validate.mockReturnValue('validation_error')
    cleanup()
    render(
      <Router location={history.location} navigator={history}>
        <SignUp addAccount={addAccount} saveAccessToken={saveAccessToken} validation={validation} />
      </Router>,
    )

    const errorWrap = screen.getByTestId('error-wrap')
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    const nameStatus = screen.getByTestId('name-status')
    const emailStatus = screen.getByTestId('email-status')
    const passwordStatus = screen.getByTestId('password-status')
    const passwordConfirmationStatus = screen.getByTestId('passwordConfirmation-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(nameStatus.title).toBe('validation_error')
    expect(nameStatus.textContent).toBe('🔴')
    expect(emailStatus.title).toBe('validation_error')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('validation_error')
    expect(passwordStatus.textContent).toBe('🔴')
    expect(passwordConfirmationStatus.title).toBe('validation_error')
    expect(passwordConfirmationStatus.textContent).toBe('🔴')
  })

  it('Should show name error if validation fails', () => {
    validation.validate.mockReturnValue('validation_error')

    populateInput('name')

    const nameStatus = screen.getByTestId('name-status')
    expect(nameStatus.title).toBe('validation_error')
    expect(nameStatus.textContent).toBe('🔴')
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

  it('Should show passwordConfirmation error if validation fails', async () => {
    validation.validate.mockReturnValue('validation_error')

    populateInput('passwordConfirmation')

    const passwordConfirmationStatus = screen.getByTestId('passwordConfirmation-status')
    expect(passwordConfirmationStatus.title).toBe('validation_error')
    expect(passwordConfirmationStatus.textContent).toBe('🔴')
  })

  it('Should show valid name state if validation succeeds', () => {
    populateInput('name')

    const nameStatus = screen.getByTestId('name-status')
    expect(nameStatus.title).toBe('Tudo certo!')
    expect(nameStatus.textContent).toBe('🟢')
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

  it('Should show valid passwordConfirmation state if validation succeeds', () => {
    populateInput('passwordConfirmation')

    const passwordConfirmationStatus = screen.getByTestId('passwordConfirmation-status')
    expect(passwordConfirmationStatus.title).toBe('Tudo certo!')
    expect(passwordConfirmationStatus.textContent).toBe('🟢')
  })

  it('Should enable submit button if form is valid', () => {
    populateInput('name')
    populateInput('email')
    populateInput('password')
    populateInput('passwordConfirmation')

    const submitButton = screen.getByTestId('submit') as HTMLButtonElement

    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    simulateValidSubmit()

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('Should call AddAccount with correct input', () => {
    simulateValidSubmit()

    expect(addAccount).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_passwordConfirmation',
      }),
    )
    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('Should call AddAccount only once', () => {
    simulateValidSubmit()
    simulateValidSubmit()

    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('Should not call AddAccount if form is invalid', () => {
    validation.validate.mockReturnValue('validation_error')

    simulateValidSubmit()

    expect(addAccount).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const error = new EmailInUseError()
    addAccount.mockRejectedValueOnce(error)

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
    expect(history.location.pathname).toBe('/')
    expect(history.index).toBe(0)
  })

  it('Should present error if SaveAccessToken fails', async () => {
    const error = new EmailInUseError()
    saveAccessToken.mockRejectedValueOnce(error)

    simulateValidSubmit()

    const errorWrap = await screen.findByTestId('error-wrap')
    const mainError = await screen.findByTestId('main-error')
    expect(errorWrap.childElementCount).toBe(1)
    expect(mainError.textContent).toBe(error.message)
  })

  it('Should got to Login page', async () => {
    fireEvent.click(screen.getByTestId('login'))

    expect(history.location.pathname).toBe('/login')
    expect(history.index).toBe(1)
  })
})
