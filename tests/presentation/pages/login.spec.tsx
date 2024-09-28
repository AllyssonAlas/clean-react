import { fireEvent, screen } from '@testing-library/react'
import { mock, MockProxy } from 'jest-mock-extended'
import { createMemoryHistory, MemoryHistory } from 'history'

import { InvalidCredentialsError } from '@/domain/errors'
import { Login } from '@/presentation/pages'
import { Validation } from '@/presentation/protocols'

import { mockAccountModel } from '@/tests/domain/mocks'
import { populateInput, testStatusForField, renderComponent } from '@/tests/presentation/utils'

type SutTypes = {
  setCurrentAccount: jest.Mock
  validation: MockProxy<Validation>
  authentication: jest.Mock
  history: MemoryHistory
}

const simulateValidSubmit = async (): Promise<void> => {
  populateInput('email')
  populateInput('password')
  await fireEvent.submit(screen.getByTestId('form'))
}

const makeSut = (error: string = undefined): SutTypes => {
  const validation = mock<Validation>()
  validation.validate.mockReturnValue(error)
  const authentication = jest.fn().mockResolvedValue(mockAccountModel())
  const history = createMemoryHistory({ initialEntries: ['/login'] })
  const { setCurrentAccount } = renderComponent({
    history,
    Component: () => <Login authentication={authentication} validation={validation} />,
  })

  return { history, setCurrentAccount, validation, authentication }
}

describe('LoginPage', () => {
  it('Should start with initial state', async () => {
    makeSut('validation_error')

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0)
    expect(screen.getByTestId('submit')).toBeDisabled()
    testStatusForField('email', 'validation_error')
    testStatusForField('password', 'validation_error')
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

  it('Should enable submit button if form is valid', () => {
    makeSut()

    populateInput('email')
    populateInput('password')

    expect(screen.getByTestId('submit')).toBeEnabled()
  })

  it('Should show spinner on submit', () => {
    makeSut()

    simulateValidSubmit()

    expect(screen.queryByTestId('spinner')).toBeInTheDocument()
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

    simulateValidSubmit()

    expect(authentication).toHaveBeenCalledTimes(0)
  })

  it('Should present error if Authentication fails', async () => {
    const { authentication } = makeSut()
    const error = new InvalidCredentialsError()
    authentication.mockRejectedValueOnce(error)

    simulateValidSubmit()
    const errorWrap = await screen.findByTestId('error-wrap')

    expect(errorWrap.childElementCount).toBe(1)
    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message)
  })

  it('Should call UpdateCurrentAccount on success', async () => {
    const { setCurrentAccount } = makeSut()

    await simulateValidSubmit()

    expect(setCurrentAccount).toHaveBeenCalledWith(mockAccountModel())
    expect(setCurrentAccount).toHaveBeenCalledTimes(1)
  })

  it('Should go to Signup page', async () => {
    const { history } = makeSut()

    fireEvent.click(screen.getByTestId('signup'))

    expect(history.location.pathname).toBe('/signup')
    expect(history.index).toBe(1)
  })
})
