import { SetStorage } from '@/domain/contracts/gateways'
import { LocalStorageAdapter } from '@/infra/gateways'

export const makeLocalStorageAdapter = (): SetStorage => new LocalStorageAdapter()
