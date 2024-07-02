import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { InvalidCredentialsError } from '../errors'

type Input = { email: string; password: string }
export type Authentication = (input: Input) => Promise<void>
type Setup = (url: string, httpPostClient: HttpPostClient) => Authentication

export const setupAuthentication: Setup = (url, httpPostClient) => {
  return async (input) => {
    const response = await httpPostClient.post({ url, body: input })
    switch (response.statusCode) {
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        return Promise.resolve()
    }
  }
}
