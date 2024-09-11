import { LocalStorageAdapter } from '@/infra/gateways'

export const makeLocalStorageAdapter = (): LocalStorageAdapter => new LocalStorageAdapter()
