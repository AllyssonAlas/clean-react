import { Router } from 'react-router-dom'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'
import { createMemoryHistory } from 'history'

import { EmailInUseError } from '@/domain/errors'
import { AccountContext } from '@/presentation/contexts'
import { SignUp } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

import { mockAccountModel } from '@/tests/domain/mocks'
import {
  populateInput,
  testButtonIsDisabled,
  testChildCount,
  testElementExists,
  testElementText,
  testStatusForField,
} from '@/tests/presentation/utils'

type SutTypes = {
  setCurrentAccount: jest.Mock
  validation: MockProxy<Validation>
  addAccount: jest.Mock
}

const history = createMemoryHistory({ initialEntries: ['/signup'] })

const simulateValidSubmit = async (): Promise<void> => {
  populateInput('name')
  populateInput('email')
  populateInput('password')
  populateInput('passwordConfirmation')
  await fireEvent.submit(screen.getByTestId('form'))
}

const makeSut = (error: string = undefined): SutTypes => {
  const setCurrentAccount = jest.fn().mockResolvedValue(undefined)
  const validation = mock<Validation>()
  validation.validate.mockReturnValue(error)
  const addAccount = jest.fn().mockResolvedValue(mockAccount())
  render(
    <AccountContext.Provider value={{ setCurrentAccount }}>
      <Router location={history.location} navigator={history}>
        <SignUp addAccount={addAccount} validation={validation} />
      </Router>
    </AccountContext.Provider>,
  )
  return { setCurrentAccount, validation, addAccount }
}

describe('Signup Page', () => {
  afterEach(cleanup)

  it('Should start with initial state', async () => {
    makeSut('validation_error')

    testChildCount('error-wrap', 0)
    testButtonIsDisabled('submit', true)
    testStatusForField('name', 'validation_error')
    testStatusForField('email', 'validation_error')
    testStatusForField('password', 'validation_error')
    testStatusForField('passwordConfirmation', 'validation_error')
  })

  it('Should show name error if validation fails', () => {
    makeSut('validation_error')

    populateInput('name')

    testStatusForField('name', 'validation_error')
  })

  it('Should show email error if validation fails', () => {
    makeSut('validation_error')

    populateInput('email')

    testStatusForField('email', 'validation_error')
  })

  it('Should show password error if validation fails', async () => {
    makeSut('validation_error')

    populateInput('password')

    testStatusForField('password', 'validation_error')
  })

  it('Should show passwordConfirmation error if validation fails', async () => {
    makeSut('validation_error')

    populateInput('passwordConfirmation')

    testStatusForField('passwordConfirmation', 'validation_error')
  })

  it('Should show valid name state if validation succeeds', () => {
    makeSut()

    populateInput('name')

    testStatusForField('name')
  })

  it('Should show valid email state if validation succeeds', () => {
    makeSut()

    populateInput('email')

    testStatusForField('email')
  })

  it('Should show valid password state if validation succeeds', () => {
    makeSut()

    populateInput('password')

    testStatusForField('password')
  })

  it('Should show valid passwordConfirmation state if validation succeeds', () => {
    makeSut()

    populateInput('passwordConfirmation')

    testStatusForField('passwordConfirmation')
  })

  it('Should enable submit button if form is valid', () => {
    makeSut()

    populateInput('name')
    populateInput('email')
    populateInput('password')
    populateInput('passwordConfirmation')

    testButtonIsDisabled('submit', false)
  })

  it('Should show spinner on submit', () => {
    makeSut()

    simulateValidSubmit()

    testElementExists('spinner')
  })

  it('Should call AddAccount with correct input', () => {
    const { addAccount } = makeSut()

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
    const { addAccount } = makeSut()

    simulateValidSubmit()
    simulateValidSubmit()

    expect(addAccount).toHaveBeenCalledTimes(1)
  })

  it('Should not call AddAccount if form is invalid', () => {
    const { addAccount } = makeSut('validation_error')

    simulateValidSubmit()

    expect(addAccount).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { addAccount } = makeSut()
    const error = new EmailInUseError()
    addAccount.mockRejectedValueOnce(error)

    simulateValidSubmit()
    const errorWrap = await screen.findByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(1)
    testElementText('main-error', error.message)
  })

  it('Should call UpdateCurrentAccount on success', async () => {
    const { setCurrentAccount } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccount).toHaveBeenCalledWith(mockAccountModel())
    expect(setCurrentAccount).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/')
    expect(history.index).toBe(0)
  })

  it('Should got to Login page', async () => {
    makeSut()

    fireEvent.click(screen.getByTestId('login'))

    expect(history.location.pathname).toBe('/login')
    expect(history.index).toBe(1)
  })
})
