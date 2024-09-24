import { mock, MockProxy } from 'jest-mock-extended'

import { AddAccount, setupAddAccount } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { EmailInUseError, UnexpectedError } from '@/domain/errors'

import { mockAddAccountInput, mockAccountModel } from '@/tests/domain/mocks'

describe('AddAccount', () => {
  let url: string
  let httpClient: MockProxy<HttpClient>
  let sut: AddAccount

  beforeAll(() => {
    url = 'any_url'
    httpClient = mock()
    httpClient.request.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel(),
    })
  })

  beforeEach(() => {
    sut = setupAddAccount(url, httpClient)
  })

  it('Should call HttpClient with correct input', async () => {
    await sut(mockAddAccountInput())

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'post', params: mockAddAccountInput() })
  })

  it('Should throw EmailInUseError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.forbidden,
    })

    const promise = sut(mockAddAccountInput())

    expect(promise).rejects.toThrow(new EmailInUseError())
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.badRequest,
    })

    const promise = sut(mockAddAccountInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound,
    })

    const promise = sut(mockAddAccountInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError,
    })

    const promise = sut(mockAddAccountInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AccountModel if HttpClient return 200', async () => {
    const account = await sut(mockAddAccountInput())

    expect(account).toEqual(mockAccountModel())
  })
})
