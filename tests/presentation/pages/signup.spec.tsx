import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'

import { SignUp } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

const populateInput = (field: string): void => {
  const input = screen.getByTestId(field)
  fireEvent.input(input, { target: { value: `any_${field}` } })
}

describe('Signup Page', () => {
  let validation: MockProxy<Validation>

  beforeAll(() => {
    validation = mock<Validation>()
  })

  beforeEach(() => {
    render(<SignUp validation={validation} />)
  })

  afterEach(cleanup)

  it('Should start with initial state', async () => {
    validation.validate.mockReturnValue('validation_error')
    cleanup()
    render(<SignUp validation={validation} />)

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
})
