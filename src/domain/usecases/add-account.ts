import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { EmailInUseError } from '@/domain/errors'

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
    const response = await httpPostClient.post({ url, params: input })
    switch (response.statusCode) {
      case HttpStatusCode.forbidden:
        throw new EmailInUseError()
      default:
        return null
    }
  }
}
