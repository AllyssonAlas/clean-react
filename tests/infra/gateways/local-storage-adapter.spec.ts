import 'jest-localstorage-mock'

import { LocalStorageAdapter } from '@/infra/gateways'

describe('LocalStorageAdapter', () => {
  let input: {
    key: string
    value: object
  }
  let fakeLocalStorage: jest.Mocked<typeof localStorage>
  let sut: LocalStorageAdapter

  beforeAll(() => {
    input = { key: 'any_key', value: { prop1: 'any_value', prop2: 'any_value' } }
    fakeLocalStorage = localStorage as jest.Mocked<typeof localStorage>
  })

  beforeEach(() => {
    localStorage.clear()
  })

  beforeEach(() => {
    sut = new LocalStorageAdapter()
  })

  it('Should call localStorage with correct input', () => {
    sut.set(input)

    expect(fakeLocalStorage.setItem).toHaveBeenCalledWith(
      'any_key',
      JSON.stringify({ prop1: 'any_value', prop2: 'any_value' }),
    )
    expect(fakeLocalStorage.setItem).toHaveBeenCalledTimes(1)
  })
})
