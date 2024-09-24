import { GetStorage, HttpClient } from '@/domain/contracts/gateways'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly storage: GetStorage,
    private readonly httpClient: HttpClient,
  ) {}

  async request(input: HttpClient.Input): Promise<HttpClient.Output> {
    const account = this.storage.get({ key: 'account' })
    if (account?.accessToken) {
      input.headers = {
        'x-access-token': account?.accessToken,
        ...input.headers,
      }
    }
    const httpResponse = await this.httpClient.request(input)
    return httpResponse
  }
}
