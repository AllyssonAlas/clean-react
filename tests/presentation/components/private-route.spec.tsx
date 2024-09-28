import { createMemoryHistory, MemoryHistory } from 'history'

import { AccountModel } from '@/domain/models'
import { PrivateRoute } from '@/presentation/components'

import { mockAccountModel } from '@/tests/domain/mocks'
import { renderComponent } from '@/tests/presentation/utils'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (account?: AccountModel): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  renderComponent({
    account,
    Component: () => <PrivateRoute component={<div />} />,
    history,
  })
  return { history }
}

describe('PrivateRoute Component', () => {
  it('Should redirect to /login if token is empty', () => {
    const { history } = makeSut(null)

    expect(history.location.pathname).toBe('/login')
  })

  it('Should render current component if token is not empty', () => {
    const { history } = makeSut(mockAccountModel())

    expect(history.location.pathname).toBe('/')
  })
})
