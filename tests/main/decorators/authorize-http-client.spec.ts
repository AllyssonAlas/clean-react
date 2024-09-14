import { mock, MockProxy } from 'jest-mock-extended'

import { GetStorage, HttpGetClient } from '@/domain/contracts/gateways'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

describe('AuthorizeHttpClientDecorator', () => {
  let request: { url: string; headers: object }
  let httpGetClient: MockProxy<HttpGetClient>
  let storage: MockProxy<GetStorage>
  let sut: AuthorizeHttpClientDecorator

  beforeAll(() => {
    request = { url: 'any_url', headers: { any: 'any' } }
    httpGetClient = mock()
    storage = mock()
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
    await sut.get({ url: 'any_url' })

    expect(httpGetClient.get).toHaveBeenCalledWith({ url: 'any_url' })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })
})
