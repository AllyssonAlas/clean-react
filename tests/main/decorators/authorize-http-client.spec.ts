import { mock, MockProxy } from 'jest-mock-extended'

import { GetStorage, HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

import { mockAccountModel } from '@/tests/domain/mocks'

describe('AuthorizeHttpClientDecorator', () => {
  let request: { url: string; method: any; headers: object }
  let httpClient: MockProxy<HttpClient>
  let storage: MockProxy<GetStorage>
  let sut: AuthorizeHttpClientDecorator

  beforeAll(() => {
    request = { url: 'any_url', method: 'get', headers: { any: 'any' } }
    httpClient = mock()
    httpClient.request.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: 'any_data',
    })
    storage = mock()
    storage.get.mockReturnValue(mockAccountModel())
  })

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(storage, httpClient)
  })

  it('Should call GetStorage with correct input', async () => {
    await sut.request(request)

    expect(storage.get).toHaveBeenCalledWith({ key: 'account' })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should not add headers if GetStorage result is invalid', async () => {
    storage.get.mockReturnValueOnce(null)

    await sut.request({ url: 'any_url', method: 'get' })

    expect(httpClient.request).toHaveBeenCalledWith({ url: 'any_url', method: 'get' })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should add headers to HttpClient', async () => {
    await sut.request({ url: 'any_url', method: 'get' })

    expect(httpClient.request).toHaveBeenCalledWith({
      url: 'any_url',
      method: 'get',
      headers: {
        'x-access-token': mockAccountModel().accessToken,
      },
    })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should merge headers to HttpClient', async () => {
    await sut.request(request)

    expect(httpClient.request).toHaveBeenCalledWith({
      url: 'any_url',
      method: 'get',
      headers: {
        'x-access-token': mockAccountModel().accessToken,
        any: 'any',
      },
    })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should return the same result as HttpClient', async () => {
    const result = await sut.request(request)

    expect(result).toEqual({
      statusCode: HttpStatusCode.ok,
      body: 'any_data',
    })
  })
})
