import { mock, MockProxy } from 'jest-mock-extended'

import { Authentication, setupAuthentication } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

import { mockAuthenticationInput, mockAccountModel } from '@/tests/domain/mocks'

describe('Authentication', () => {
  let url: string
  let httpPostClient: MockProxy<HttpPostClient>
  let sut: Authentication

  beforeAll(() => {
    url = 'any_url'
    httpPostClient = mock()
    httpPostClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel(),
    })
  })

  beforeEach(() => {
    sut = setupAuthentication(url, httpPostClient)
  })

  it('Should call HttpPostClient with correct URL and params', async () => {
    await sut(mockAuthenticationInput())

    expect(httpPostClient.post).toHaveBeenCalledWith({
      url,
      params: mockAuthenticationInput(),
    })
  })

  it('Should throw InvalidCredentialsError if HttpPostClient returns 401', async () => {
    httpPostClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 400', async () => {
    httpPostClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.badRequest,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpPostClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpPostClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AccountModel if HttpPostClient return 200', async () => {
    const account = await sut(mockAuthenticationInput())

    expect(account).toEqual(mockAccountModel())
  })
})
