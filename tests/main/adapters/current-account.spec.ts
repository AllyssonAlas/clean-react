import { UnexpectedError } from '@/domain/errors'
import { LocalStorageAdapter } from '@/infra/gateways'
import { setCurrentAccountAdapter } from '@/main/adapters'

jest.mock('@/infra/gateways/local-storage-adapter')

describe('CurrentAccountAdapter', () => {
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
