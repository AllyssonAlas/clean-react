import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { AccountModel } from '@/domain/models'
import { AccountContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'

import { mockAccountModel } from '@/tests/domain/mocks'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account?: AccountModel): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  render(
    <AccountContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router location={history.location} navigator={history}>
        <PrivateRoute component={<div />} />
      </Router>
    </AccountContext.Provider>,
  )
  return { history }
}

describe('PrivateRoute Component', () => {
  it('Should redirect to /login if token is empty', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/login')
  })

  it('Should render current component if token is not empty', () => {
    const { history } = makeSut(mockAccountModel())

    expect(history.location.pathname).toBe('/')
  })
})
