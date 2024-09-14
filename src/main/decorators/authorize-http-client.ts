import { GetStorage, HttpGetClient } from '@/domain/contracts/gateways'

export class AuthorizeHttpClientDecorator implements HttpGetClient {
  constructor(
    private readonly storage: GetStorage,
    private readonly httpClient: HttpGetClient,
  ) {}

  async get(input: HttpGetClient.Input): Promise<HttpGetClient.Output> {
    const account = this.storage.get({ key: 'account' })
    if (account?.accessToken) {
      input.headers = {
        'x-access-token': account?.accessToken,
        ...input.headers,
      }
    }
    const httpResponse = await this.httpClient.get(input)
    return httpResponse
  }
}
