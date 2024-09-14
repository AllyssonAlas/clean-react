import { mock, MockProxy } from 'jest-mock-extended'

import { GetStorage, HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

import { mockAccountModel } from '@/tests/domain/mocks'

describe('AuthorizeHttpClientDecorator', () => {
  let request: { url: string; headers: object }
  let httpGetClient: MockProxy<HttpGetClient>
  let storage: MockProxy<GetStorage>
  let sut: AuthorizeHttpClientDecorator

  beforeAll(() => {
    request = { url: 'any_url', headers: { any: 'any' } }
    httpGetClient = mock()
    httpGetClient.get.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: 'any_data',
    })
    storage = mock()
    storage.get.mockReturnValue(mockAccountModel())
  })

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(storage, httpGetClient)
  })

  it('Should call GetStorage with correct input', async () => {
    await sut.get(request)

    expect(storage.get).toHaveBeenCalledWith({ key: 'account' })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should not add headers if GetStorage result is invalid', async () => {
    storage.get.mockReturnValueOnce(null)

    await sut.get({ url: 'any_url' })

    expect(httpGetClient.get).toHaveBeenCalledWith({ url: 'any_url' })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should add headers to HttpClient', async () => {
    await sut.get({ url: 'any_url' })

    expect(httpGetClient.get).toHaveBeenCalledWith({
      url: 'any_url',
      headers: {
        'x-access-token': mockAccountModel().accessToken,
      },
    })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should merge headers to HttpClient', async () => {
    await sut.get(request)

    expect(httpGetClient.get).toHaveBeenCalledWith({
      url: 'any_url',
      headers: {
        'x-access-token': mockAccountModel().accessToken,
        any: 'any',
      },
    })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })

  it('Should return the same result as HttpClient', async () => {
    const result = await sut.get(request)

    expect(result).toEqual({
      statusCode: HttpStatusCode.ok,
      body: 'any_data',
    })
  })
})
