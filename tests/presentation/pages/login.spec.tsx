import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'

import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

describe('Login Page', () => {
  let validation: MockProxy<Validation>
  let sut: RenderResult

  beforeAll(() => {
    validation = mock()
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
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
  })

  it('Should call Validation with correct email', () => {
    const emailInput = sut.getByTestId('email')

    fireEvent.input(emailInput, { target: { value: 'any_email' } })

    expect(validation.validate).toHaveBeenCalledWith({ email: 'any_email' })
  })
})
