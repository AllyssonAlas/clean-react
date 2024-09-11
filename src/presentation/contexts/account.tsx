import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

type Data = {
  setCurrentAccount?: (account: AccountModel) => void
  getCurrentAccount?: () => AccountModel
}

export const AccountContext = createContext<Data>(null)
