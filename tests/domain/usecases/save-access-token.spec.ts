import { mock, MockProxy } from 'jest-mock-extended'

import { UnexpectedError } from '@/domain/errors'
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

  it('Should rethrow if SetStorage throws', async () => {
    setStorage.set.mockRejectedValueOnce(new Error())

    const promise = sut({ token: 'any_token' })

    expect(promise).rejects.toThrow(new Error())
  })

  it('Should throw if token is falsy', async () => {
    const promise = sut({ token: undefined })

    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
