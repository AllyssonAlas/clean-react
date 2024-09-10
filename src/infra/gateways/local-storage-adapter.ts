import { SetStorage } from '@/domain/contracts/gateways'

export class LocalStorageAdapter implements SetStorage {
  async set({ key, value }: SetStorage.Input): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value))
  }
}
