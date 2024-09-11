import { Router } from 'react-router-dom'
import { render } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { PrivateRoute } from '@/presentation/components'

describe('PrivateRoute Component', () => {
  let history: MemoryHistory

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ['/'] })
    render(
      <Router location={history.location} navigator={history}>
        <PrivateRoute />
      </Router>,
    )
  })

  it('Should redirect to /login if token is empty', () => {
    expect(history.location.pathname).toBe('/login')
  })
})
