import { render, screen } from '@testing-library/react'

import { SignUp } from '@/presentation/pages'

describe('Signup Page', () => {
  beforeEach(() => {
    render(<SignUp />)
  })

  it('Should start with initial state', async () => {
    const errorWrap = screen.getByTestId('error-wrap')
    const submitButton = screen.getByTestId('submit') as HTMLButtonElement
    const nameStatus = screen.getByTestId('name-status')
    const emailStatus = screen.getByTestId('email-status')
    const passwordStatus = screen.getByTestId('password-status')
    const passwordConfirmationStatus = screen.getByTestId('passwordConfirmation-status')

    expect(errorWrap.childElementCount).toBe(0)
    expect(submitButton.disabled).toBe(true)
    expect(nameStatus.title).toBe('Campo obrigatório')
    expect(nameStatus.textContent).toBe('🔴')
    expect(emailStatus.title).toBe('Campo obrigatório')
    expect(emailStatus.textContent).toBe('🔴')
    expect(passwordStatus.title).toBe('Campo obrigatório')
    expect(passwordStatus.textContent).toBe('🔴')
    expect(passwordConfirmationStatus.title).toBe('Campo obrigatório')
    expect(passwordConfirmationStatus.textContent).toBe('🔴')
  })
})
