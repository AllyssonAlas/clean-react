import { mock, MockProxy } from 'jest-mock-extended'

import { UnexpectedError } from '@/domain/errors'
import { UpdateCurrentAccount, setupUpdateCurrentAccount } from '@/domain/usecases'
import { SetStorage } from '@/domain/contracts/gateways'

describe('UpdateCurrentAccount', () => {
  let setStorage: MockProxy<SetStorage>
  let sut: UpdateCurrentAccount

  beforeAll(() => {
    setStorage = mock()
  })

  beforeEach(() => {
    sut = setupUpdateCurrentAccount(setStorage)
  })

  it('Should call SetStorage with correct input', async () => {
    await sut({ accessToken: 'any_token' })

    expect(setStorage.set).toHaveBeenCalledWith({ key: 'accessToken', value: 'any_token' })
    expect(setStorage.set).toHaveBeenCalledTimes(1)
  })

  it('Should rethrow if SetStorage throws', async () => {
    setStorage.set.mockRejectedValueOnce(new Error())

    const promise = sut({ accessToken: 'any_token' })

    expect(promise).rejects.toThrow(new Error())
  })

  it('Should throw if token is falsy', async () => {
    const promise = sut({ accessToken: undefined })

    expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
