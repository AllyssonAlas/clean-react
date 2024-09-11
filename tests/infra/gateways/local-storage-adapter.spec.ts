import 'jest-localstorage-mock'

import { LocalStorageAdapter } from '@/infra/gateways'

describe('LocalStorageAdapter', () => {
  let fakeLocalStorage: jest.Mocked<typeof localStorage>
  let sut: LocalStorageAdapter

  beforeAll(() => {
    fakeLocalStorage = localStorage as jest.Mocked<typeof localStorage>
  })

  beforeEach(() => {
    localStorage.clear()
    sut = new LocalStorageAdapter()
  })

  describe('set', () => {
    let input: {
      key: string
      value: object
    }

    beforeAll(() => {
      input = { key: 'any_key', value: { prop1: 'any_value', prop2: 'any_value' } }
    })

    it('Should call localStorage.setItem with correct input', () => {
      sut.set(input)

      expect(fakeLocalStorage.setItem).toHaveBeenCalledWith(
        'any_key',
        JSON.stringify({ prop1: 'any_value', prop2: 'any_value' }),
      )
      expect(fakeLocalStorage.setItem).toHaveBeenCalledTimes(1)
    })
  })

  describe('set', () => {
    let input: {
      key: string
    }

    beforeAll(() => {
      input = { key: 'any_key' }
    })

    it('Should call localStorage.getItem with correct input', () => {
      sut.get(input)

      expect(fakeLocalStorage.getItem).toHaveBeenCalledWith('any_key')
      expect(fakeLocalStorage.getItem).toHaveBeenCalledTimes(1)
    })

    it('Should return same output as localStorage.getItem', () => {
      const data = { data: 'any_data' }
      localStorage.setItem('any_key', JSON.stringify(data))

      const result = sut.get(input)

      expect(result).toEqual(data)
    })
  })
})
