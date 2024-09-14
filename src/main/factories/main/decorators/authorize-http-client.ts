import { AuthorizeHttpClientDecorator } from '@/main/decorators'
import { makeAxiosHttpClient, makeLocalStorageAdapter } from '@/main/factories/infra/gateways'

export const makeAuthorizeHttpClientDecorator = (): AuthorizeHttpClientDecorator => {
  return new AuthorizeHttpClientDecorator(makeLocalStorageAdapter(), makeAxiosHttpClient())
}
