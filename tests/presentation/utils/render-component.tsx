import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { MemoryHistory } from 'history'

import { AccountModel } from '@/domain/models'
import { AccountContext } from '@/presentation/contexts'

import { mockAccountModel } from '@/tests/domain/mocks'

type Params = {
  Component: React.FC
  history: MemoryHistory
  account?: AccountModel
}

type Result = {
  setCurrentAccount: jest.Mock
}

export const renderComponent = ({ Component, history, account = mockAccountModel() }: Params): Result => {
  const setCurrentAccount = jest.fn().mockResolvedValue(undefined)
  render(
    <AccountContext.Provider value={{ setCurrentAccount, getCurrentAccount: () => account }}>
      <Router location={history.location} navigator={history}>
        {<Component />}
      </Router>
    </AccountContext.Provider>,
  )
  return { setCurrentAccount }
}
