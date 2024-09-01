import { SetStorage } from '@/domain/contracts/gateways'
import { UnexpectedError } from '@/domain/errors'

type Input = { token: string }
export type SaveAccessToken = (input: Input) => Promise<void>
type Setup = (storage: SetStorage<string>) => SaveAccessToken

export const setupSaveAccessToken: Setup = (storage) => {
  return async ({ token }) => {
    if (!token) throw new UnexpectedError()
    await storage.set({ key: 'accessToken', value: token })
  }
}
