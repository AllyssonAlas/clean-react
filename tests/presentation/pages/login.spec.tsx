import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'

import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

describe('Login Page', () => {
  let validationError: string
  let validation: MockProxy<Validation>
  let sut: RenderResult

  beforeAll(() => {
    validationError = 'validation_error'
    validation = mock()
    validation.validate.mockReturnValue(validationError)
  })

  beforeEach(() => {
    sut = render(<Login validation={validation} />)
  })

  afterEach(cleanup)

  it('Should start with initial state', () => {
    const errorWrap = sut.getByTestId('error-wrap')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement
    const emailStatus = sut.getByTestId('email-status')
    const passwordStatus = sut.getByTestId('password-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should call Validation with correct email', () => {
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(validation.validate).toHaveBeenCalledWith('email', 'any_email')
  })

  it('Should call Validation with correct password', () => {
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(validation.validate).toHaveBeenCalledWith('password', 'any_password')
  })

  it('Should show email error if validation fails', () => {
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('email-status')

    expect(emailStatus.title).toBe(validationError)
    expect(emailStatus.textContent).toBe('🔴')
  })
})
