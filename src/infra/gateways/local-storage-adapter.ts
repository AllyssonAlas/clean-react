import { SetStorage, GetStorage } from '@/domain/contracts/gateways'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set({ key, value }: SetStorage.Input): void {
    localStorage.setItem(key, JSON.stringify(value))
  }

  get({ key }: GetStorage.Input): GetStorage.Output {
    return JSON.parse(localStorage.getItem(key))
  }
}
