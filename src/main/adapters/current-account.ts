import { UnexpectedError } from '@/domain/errors'
import { AccountModel } from '@/domain/models'
import { makeLocalStorageAdapter } from '@/main/factories/infra/gateways'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) throw new UnexpectedError()
  makeLocalStorageAdapter().set({ key: 'account', value: account })
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get({ key: 'account' })
}
