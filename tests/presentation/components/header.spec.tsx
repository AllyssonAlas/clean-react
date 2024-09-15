import { Router } from 'react-router-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { AccountContext } from '@/presentation/contexts'
import { Header } from '@/presentation/components'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccount: jest.Mock
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const setCurrentAccount = jest.fn()
  render(
    <AccountContext.Provider value={{ setCurrentAccount }}>
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
})
