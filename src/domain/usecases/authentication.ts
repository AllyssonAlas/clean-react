import { AccountModel } from '@/domain/models'
import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type Input = { email: string; password: string }
type Output = AccountModel
export type Authentication = (input: Input) => Promise<Output>
type Setup = (url: string, httpPostClient: HttpPostClient<Input, Output>) => Authentication

export const setupAuthentication: Setup = (url, httpPostClient) => {
  return async (input) => {
    const response = await httpPostClient.post({ url, body: input })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialsError()
      default:
        throw new UnexpectedError()
    }
  }
}
