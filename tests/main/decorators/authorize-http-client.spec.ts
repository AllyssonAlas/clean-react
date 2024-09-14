import { mock, MockProxy } from 'jest-mock-extended'

import { GetStorage } from '@/domain/contracts/gateways'
import { AuthorizeHttpClientDecorator } from '@/main/decorators'

describe('AuthorizeHttpClientDecorator', () => {
  let request: { url: string; headers: object }
  let storage: MockProxy<GetStorage>
  let sut: AuthorizeHttpClientDecorator

  beforeAll(() => {
    request = { url: 'any_url', headers: { any: 'any' } }
    storage = mock()
  })

  beforeEach(() => {
    sut = new AuthorizeHttpClientDecorator(storage)
  })

  it('Should call GetStorage with correct input', async () => {
    await sut.get(request)

    expect(storage.get).toHaveBeenCalledWith({ key: 'account' })
    expect(storage.get).toHaveBeenCalledTimes(1)
  })
})
