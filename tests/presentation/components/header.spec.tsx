import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { AccountContext } from '@/presentation/contexts'
import { Header } from '@/presentation/components'

import { mockAccountModel } from '@/tests/domain/mocks'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccount: jest.Mock
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccount = jest.fn()
  const getCurrentAccount = jest.fn().mockReturnValue(account)
  render(
    <AccountContext.Provider value={{ setCurrentAccount, getCurrentAccount }}>
      <Router location={history.location} navigator={history}>
        <Header />
      </Router>
    </AccountContext.Provider>,
  )
  return { history, setCurrentAccount }
}

describe('Header Component', () => {
  it('Should call setCurrentAccount with null', () => {
    const { history, setCurrentAccount } = makeSut()

    fireEvent.click(screen.getByTestId('logout'))

    expect(setCurrentAccount).toHaveBeenCalledWith(null)
    expect(setCurrentAccount).toHaveBeenCalledTimes(1)
    expect(history.location.pathname).toBe('/login')
  })

  it('Should render account name correctly', async () => {
    const account = mockAccountModel()

    makeSut(account)

    expect(screen.getByTestId('username')).toHaveTextContent(account.name)
  })
})
