import { HttpPostClient } from '@/domain/contracts/gateways'

type Input = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}
export type AddAccount = (input: Input) => Promise<void>
type Setup = (url: string, httpPostClient: HttpPostClient<Input>) => AddAccount

export const setupAddAccount: Setup = (url, httpPostClient) => {
  return async (input) => {
    await httpPostClient.post({ url, params: input })
  }
}
