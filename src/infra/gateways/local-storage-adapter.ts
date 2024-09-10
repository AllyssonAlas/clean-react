import { SetStorage } from '@/domain/contracts/gateways'

export class LocalStorageAdapter implements SetStorage {
  set({ key, value }: SetStorage.Input): void {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
