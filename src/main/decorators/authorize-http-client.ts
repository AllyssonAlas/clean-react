import { GetStorage, HttpGetClient } from '@/domain/contracts/gateways'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor(private readonly storage: GetStorage) {}

  async get(input: HttpGetClient.Input): Promise<HttpGetClient.Output> {
    this.storage.get({ key: 'account' })
    return null
  }
}
