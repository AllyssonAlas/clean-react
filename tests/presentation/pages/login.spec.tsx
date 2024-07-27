import { render, RenderResult, fireEvent, cleanup, waitFor } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'

import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

describe('Login Page', () => {
  let validation: MockProxy<Validation>
  let sut: RenderResult

  beforeAll(() => {
    validation = mock()
    validation.validate.mockReturnValue(undefined)
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

    waitFor(() => {
      expect(errorWrap.childElementCount).toBe(0)
      expect(submitButton.disabled).toBe(true)
      expect(emailStatus.title).toBe('validation_error')
      expect(emailStatus.textContent).toBe('🔴')
      expect(passwordStatus.title).toBe('validation_error')
      expect(passwordStatus.textContent).toBe('🔴')
    })
  })

  it('Should show email error if validation fails', () => {
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    const emailStatus = sut.getByTestId('email-status')

    waitFor(() => {
      expect(emailStatus.title).toBe('validation_error')
      expect(emailStatus.textContent).toBe('🔴')
    })
  })

  it('Should show password error if validation fails', () => {
    const passwordInput = sut.getByTestId('password')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    const passwordStatus = sut.getByTestId('password-status')

    waitFor(() => {
      expect(passwordStatus.title).toBe('validation_error')
      expect(passwordStatus.textContent).toBe('🔴')
    })
  })

  it('Should show valid email state if validation succeeds', () => {
    const emailInput = sut.getByTestId('email')
    const emailStatus = sut.getByTestId('email-status')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(emailStatus.title).toBe('Tudo certo!')
    expect(emailStatus.textContent).toBe('🟢')
  })

  it('Should show valid password state if validation succeeds', () => {
    const passwordInput = sut.getByTestId('password')
    const passwordStatus = sut.getByTestId('password-status')

    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(passwordStatus.title).toBe('Tudo certo!')
    expect(passwordStatus.textContent).toBe('🟢')
  })

  it('Should enable submit button if form is valid', () => {
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })

    expect(submitButton.disabled).toBe(false)
  })

  it('Should show spinner on submit', () => {
    const emailInput = sut.getByTestId('email')
    const passwordInput = sut.getByTestId('password')
    const submitButton = sut.getByTestId('submit')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })
    fireEvent.input(passwordInput, { target: { value: 'any_password' } })
    fireEvent.click(submitButton)

    waitFor(() => {
      const spinner = sut.getByTestId('spinner')
      expect(spinner).toBeTruthy()
    })
  })
})
