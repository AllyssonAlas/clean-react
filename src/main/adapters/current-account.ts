import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories/infra/gateways'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set({ key: 'account', value: account })
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get({ key: 'account' })
}
