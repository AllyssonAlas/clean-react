import { UnexpectedError } from '@/domain/errors'
import { LocalStorageAdapter } from '@/infra/gateways'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'

import { mockAccountModel } from '@/tests/domain/mocks'

jest.mock('@/infra/gateways/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  describe('setCurrentAccountAdapter', () => {
    it('Should call LocalStorageAdapter.set with correct input', () => {
      const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

      setCurrentAccountAdapter(mockAccountModel())

      expect(setSpy).toHaveBeenCalledWith({ key: 'account', value: mockAccountModel() })
    })

    it('Should throw UnexpectedError', () => {
      expect(() => {
        setCurrentAccountAdapter(undefined)
      }).toThrow(new UnexpectedError())
    })
  })

  describe('getCurrentAccountAdapter', () => {
    it('Should call LocalStorageAdapter.get with correct input', () => {
      const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get')

      getCurrentAccountAdapter()

      expect(getSpy).toHaveBeenCalledWith({ key: 'account' })
      expect(getSpy).toHaveBeenCalledTimes(1)
    })

    it('Should return same output as LocalStorageAdapter.get', () => {
      jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValue(mockAccountModel())

      const result = getCurrentAccountAdapter()

      expect(result).toEqual(mockAccountModel())
    })
  })
})
