import { AccountModel } from '@/domain/models'
import { SetStorage } from '@/domain/contracts/gateways'
import { UnexpectedError } from '@/domain/errors'

type Input = AccountModel
export type UpdateCurrentAccount = (input: Input) => Promise<void>
type Setup = (storage: SetStorage<AccountModel>) => UpdateCurrentAccount

export const setupUpdateCurrentAccount: Setup = (storage) => {
  return async (account) => {
    if (!account?.accessToken) throw new UnexpectedError()
    storage.set({ key: 'account', value: account })
  }
}
