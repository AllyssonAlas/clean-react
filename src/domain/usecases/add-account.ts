import { AccountModel } from '@/domain/models'
import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccountApiModel } from '@/domain/contracts/models'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

type Input = {
  email: string
  name: string
  password: string
  passwordConfirmation: string
}
type Output = AccountModel
export type AddAccount = (input: Input) => Promise<Output>
type Setup = (url: string, httpPostClient: HttpPostClient<Input, AccountApiModel>) => AddAccount

export const setupAddAccount: Setup = (url, httpPostClient) => {
  return async (input) => {
    const response = await httpPostClient.post({ url, params: input })
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
