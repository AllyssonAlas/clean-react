import 'jest-localstorage-mock'

import { LocalStorageAdapter } from '@/infra/gateways'

describe('LocalStorageAdapter', () => {
  let input: {
    key: string
    value: string
  }
  let fakeLocalStorage: jest.Mocked<typeof localStorage>
  let sut: LocalStorageAdapter

  beforeAll(() => {
    input = { key: 'any_key', value: 'any_value' }
    fakeLocalStorage = localStorage as jest.Mocked<typeof localStorage>
  })

  beforeEach(() => {
    localStorage.clear()
  })

  beforeEach(() => {
    sut = new LocalStorageAdapter()
  })

  it('Should call localStorage with correct input', async () => {
    await sut.set(input)

    expect(fakeLocalStorage.setItem).toHaveBeenCalledWith('any_key', 'any_value')
    expect(fakeLocalStorage.setItem).toHaveBeenCalledTimes(1)
  })
})
