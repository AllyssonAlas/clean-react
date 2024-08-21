import { mock, MockProxy } from 'jest-mock-extended'

import { SaveAccessToken, setupSaveAccessToken } from '@/domain/usecases'
import { SetStorage } from '@/domain/contracts/gateways'

describe('SaveAccessToken', () => {
  let setStorage: MockProxy<SetStorage>
  let sut: SaveAccessToken

  beforeAll(() => {
    setStorage = mock()
  })

  beforeEach(() => {
    sut = setupSaveAccessToken(setStorage)
  })

  it('Should call SetStorage with correct input', async () => {
    await sut({ token: 'any_token' })

    expect(setStorage.set).toHaveBeenCalledWith({ key: 'accessToken', value: 'any_token' })
    expect(setStorage.set).toHaveBeenCalledTimes(1)
  })
})
