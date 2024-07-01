import { HttpPostClient } from '@/domain/contracts/gateways'

export type Authentication = () => Promise<void>
type Setup = (url: string, httpPostClient: HttpPostClient) => Authentication

export const setupAuthentication: Setup = (url, httpPostClient) => {
  return async () => {
    await httpPostClient.post({ url })
    return Promise.resolve()
  }
}
