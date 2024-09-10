import { createContext } from 'react'

import { AccountModel } from '@/domain/models'

type Data = {
  setCurrentAccount?: (account: AccountModel) => void
}

export const AccountContext = createContext<Data>(null)
