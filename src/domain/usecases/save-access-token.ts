import { SetStorage } from '@/domain/contracts/gateways'

type Input = { token: string }
export type SaveAccessToken = (input: Input) => Promise<void>
type Setup = (storage: SetStorage<string>) => SaveAccessToken

export const setupSaveAccessToken: Setup = (storage) => {
  return async ({ token }) => {
    await storage.set({ key: 'accessToken', value: token })
  }
}