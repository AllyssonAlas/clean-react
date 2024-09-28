import { fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory, MemoryHistory } from 'history'

import { Header } from '@/presentation/components'

import { mockAccountModel } from '@/tests/domain/mocks'
import { renderComponent } from '@/tests/presentation/utils'

type SutTypes = {
  history: MemoryHistory
  setCurrentAccount: jest.Mock
}

const makeSut = (account = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] })
  const { setCurrentAccount } = renderComponent({
    account,
    Component: () => <Header />,
    history,
  })

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
