import { mock, MockProxy } from 'jest-mock-extended'

import { Authentication, setupAuthentication } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'

import { mockAuthenticationInput, mockAccountModel } from '@/tests/domain/mocks'

describe('Authentication', () => {
  let url: string
  let httpClient: MockProxy<HttpClient>
  let sut: Authentication

  beforeAll(() => {
    url = 'any_url'
    httpClient = mock()
    httpClient.request.mockResolvedValue({
      statusCode: HttpStatusCode.ok,
      body: mockAccountModel(),
    })
  })

  beforeEach(() => {
    sut = setupAuthentication(url, httpClient)
  })

  it('Should call HttpClient with correct input', async () => {
    await sut(mockAuthenticationInput())

    expect(httpClient.request).toHaveBeenCalledWith({
      url,
      method: 'post',
      params: mockAuthenticationInput(),
    })
  })

  it('Should throw InvalidCredentialsError if HttpClient returns 401', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })

  it('Should throw UnexpectedError if HttpClient returns 400', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.badRequest,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 404', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError,
    })

    const promise = sut(mockAuthenticationInput())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return an AccountModel if HttpClient return 200', async () => {
    const account = await sut(mockAuthenticationInput())

    expect(account).toEqual(mockAccountModel())
  })
})
