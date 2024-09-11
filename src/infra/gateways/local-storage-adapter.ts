import { GetStorage, SetStorage } from '@/domain/contracts/gateways'

export class LocalStorageAdapter implements SetStorage {
  set({ key, value }: SetStorage.Input): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get({ key }: GetStorage.Input): void {
    localStorage.getItem(key)
  }
}
