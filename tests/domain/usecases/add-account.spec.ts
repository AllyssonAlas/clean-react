import { mock, MockProxy } from 'jest-mock-extended'

import { AddAccount, setupAddAccount } from '@/domain/usecases'
import { HttpPostClient } from '@/domain/contracts/gateways'

import { mockAddAccountInput } from '@/tests/domain/mocks'

describe('AddAccount', () => {
  let url: string
  let httpPostClient: MockProxy<HttpPostClient>
  let sut: AddAccount

  beforeAll(() => {
    url = 'any_url'
    httpPostClient = mock()
  })

  beforeEach(() => {
    sut = setupAddAccount(url, httpPostClient)
  })

  it('Should call HttpPostClient with correct URL and params', async () => {
    await sut(mockAddAccountInput())

    expect(httpPostClient.post).toHaveBeenCalledWith({ url, params: mockAddAccountInput() })
  })
})
