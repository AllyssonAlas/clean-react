import { SetStorage, GetStorage } from '@/domain/contracts/gateways'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set({ key, value }: SetStorage.Input): void {
    if (value) localStorage.setItem(key, JSON.stringify(value))
    else localStorage.removeItem(key)
  }

  get({ key }: GetStorage.Input): GetStorage.Output {
    return JSON.parse(localStorage.getItem(key))
  }
}
