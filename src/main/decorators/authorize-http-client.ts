import { GetStorage, HttpGetClient } from '@/domain/contracts/gateways'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor(
    private readonly storage: GetStorage,
    private readonly httpClient: HttpGetClient,
  ) {}

  async get(input: HttpGetClient.Input): Promise<HttpGetClient.Output> {
    this.storage.get({ key: 'account' })
    await this.httpClient.get(input)
    return null
  }
}
