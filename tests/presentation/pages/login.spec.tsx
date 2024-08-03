import { render, fireEvent, cleanup, screen } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'

import { Authentication } from '@/domain/usecases'
import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

type SutTypes = {
  authentication: Authentication
  validation: MockProxy<Validation>
}

const makeSut = (error?: string): SutTypes => {
  const validation = mock<Validation>()
  validation.validate.mockReturnValue(error)
  const authentication = jest.fn() as Authentication
  render(<Login authentication={authentication} validation={validation} />)
  return { authentication, validation }
}

describe('Login Page', () => {
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
    const emailInput = screen.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    const emailStatus = screen.getByTestId('email-status')
    expect(emailStatus.title).toBe('validation_error')
    expect(emailStatus.textContent).toBe('🔴')
  })

  it('Should show password error if validation fails', () => {
    makeSut('validation_error')
    const passwordInput = screen.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    const passwordStatus = screen.getByTestId('password-status')
    expect(passwordStatus.title).toBe('validation_error')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should show valid email state if validation succeeds', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    const emailStatus = screen.getByTestId('email-status')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('Should show valid password state if validation succeeds', () => {
    makeSut()
    const passwordInput = screen.getByTestId('password')
    const passwordStatus = screen.getByTestId('password-status')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    makeSut()
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitButton = screen.getByTestId('submit')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    fireEvent.submit(submitButton)

    const spinner = screen.queryByTestId('spinner')
    expect(spinner).toBeTruthy()
  })

  it('Should call Authentication with correct input', () => {
    const { authentication } = makeSut()
    const emailInput = screen.getByTestId('email')
    const passwordInput = screen.getByTestId('password')
    const submitButton = screen.getByTestId('submit')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    fireEvent.submit(submitButton)

    expect(authentication).toHaveBeenCalledWith(
      expect.objectContaining({
        email: 'any_email',
        password: 'any_password',
      }),
    )
    expect(authentication).toHaveBeenCalledTimes(1)
  })
})
