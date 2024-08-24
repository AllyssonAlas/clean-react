import { mock, MockProxy } from 'jest-mock-extended'

import { AddAccount, setupAddAccount } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { EmailInUseError } from '@/domain/errors'

import { mockAddAccountInput } from '@/tests/domain/mocks'

describe('AddAccount', () => {
  let url: string
  let httpPostClient: MockProxy<HttpPostClient>
  let sut: AddAccount

  beforeAll(() => {
    url = 'any_url'
    httpPostClient = mock()
    httpPostClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
    })
  })

  beforeEach(() => {
    sut = setupAddAccount(url, httpPostClient)
  })

  it('Should call HttpPostClient with correct URL and params', async () => {
    await sut(mockAddAccountInput())

    expect(httpPostClient.post).toHaveBeenCalledWith({ url, params: mockAddAccountInput() })
  })

  it('Should throw EmailInUseError if HttpPostClient returns 401', async () => {
    httpPostClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.forbidden,
    })

    const promise = sut(mockAddAccountInput())

    expect(promise).rejects.toThrow(new EmailInUseError())
  })
})
