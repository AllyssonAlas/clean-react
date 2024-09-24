import { AccountModel } from '@/domain/models'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccountApiModel } from '@/domain/models/externals'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

type Input = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}
type Output = AccountModel
export type AddAccount = (input: Input) => Promise<Output>
type Setup = (url: string, httpClient: HttpClient<Input, AccountApiModel>) => AddAccount

export const setupAddAccount: Setup = (url, httpClient) => {
  return async (input) => {
    const response = await httpClient.request({ url, method: 'post', params: input })
    switch (response.statusCode) {
      case HttpStatusCode.ok:
        return response.body
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        throw new UnexpectedError()
    }
  }
}
