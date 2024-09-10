import { AccountModel } from '@/domain/models'
import { SetStorage } from '@/domain/contracts/gateways'
import { UnexpectedError } from '@/domain/errors'

type Input = AccountModel
export type UpdateCurrentAccount = (input: Input) => Promise<void>
type Setup = (storage: SetStorage<string>) => UpdateCurrentAccount

export const setupUpdateCurrentAccount: Setup = (storage) => {
  return async ({ accessToken }) => {
    if (!accessToken) throw new UnexpectedError()
    await storage.set({ key: 'accessToken', value: accessToken })
  }
}
