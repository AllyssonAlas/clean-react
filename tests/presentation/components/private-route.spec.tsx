import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { AccountContext } from '@/presentation/contexts'
import { PrivateRoute } from '@/presentation/components'

import { mockAccountModel } from '@/tests/domain/mocks'

describe('PrivateRoute Component', () => {
  let history: MemoryHistory

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
  })

  it('Should redirect to /login if token is empty', () => {
    const getCurrentAccount = () => null

    render(
      <AccountContext.Provider value={{ getCurrentAccount }}>
        <Router location={history.location} navigator={history}>
          <PrivateRoute component={<div />} />
        </Router>
      </AccountContext.Provider>,
    )

    expect(history.location.pathname).toBe('/login')
  })

  it('Should render current component if token is not empty', () => {
    const getCurrentAccount = () => mockAccountModel()

    render(
      <AccountContext.Provider value={{ getCurrentAccount }}>
        <Router location={history.location} navigator={history}>
          <PrivateRoute component={<div />} />
        </Router>
      </AccountContext.Provider>,
    )

    expect(history.location.pathname).toBe('/')
  })
})
