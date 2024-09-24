import { AccountModel } from '@/domain/models'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccountApiModel } from '@/domain/models/externals'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

type Input = { email: string; password: string }
type Output = AccountModel
export type Authentication = (input: Input) => Promise<Output>
type Setup = (url: string, httpClient: HttpClient<Input, AccountApiModel>) => Authentication

export const setupAuthentication: Setup = (url, httpClient) => {
  return async (input) => {
    const response = await httpClient.request({ url, method: 'post', params: input })
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
