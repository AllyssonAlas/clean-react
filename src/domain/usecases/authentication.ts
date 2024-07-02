import { HttpPostClient } from '@/domain/contracts/gateways'

type Input = { email: string; password: string }
export type Authentication = (input: Input) => Promise<void>
type Setup = (url: string, httpPostClient: HttpPostClient) => Authentication

export const setupAuthentication: Setup = (url, httpPostClient) => {
  return async (input) => {
    await httpPostClient.post({ url, body: input })
    return Promise.resolve()
  }
}
