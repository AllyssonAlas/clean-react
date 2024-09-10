import { UpdateCurrentAccount, setupUpdateCurrentAccount } from '@/domain/usecases'
import { makeLocalStorageAdapter } from '@/main/factories/infra/gateways'

export const makeUpdateCurrentAccount = (): UpdateCurrentAccount => {
  return setupUpdateCurrentAccount(makeLocalStorageAdapter())
}
