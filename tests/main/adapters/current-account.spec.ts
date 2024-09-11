import { UnexpectedError } from '@/domain/errors'
import { LocalStorageAdapter } from '@/infra/gateways'
import { setCurrentAccountAdapter, getCurrentAccountAdapter } from '@/main/adapters'

jest.mock('@/infra/gateways/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
  describe('setCurrentAccountAdapter', () => {
    it('Should call LocalStorageAdapter.set with correct input', () => {
      const account = { accessToken: 'any_access_token', name: 'any_name' }
      const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set')

      setCurrentAccountAdapter(account)

      expect(setSpy).toHaveBeenCalledWith({ key: 'account', value: account })
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
  })
})
