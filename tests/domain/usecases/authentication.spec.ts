import { mock, MockProxy } from 'jest-mock-extended'

import { Authentication, setupAuthentication } from '@/domain/usecases'
import { HttpPostClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { InvalidCredentialsError } from '@/domain/errors'

import { mockAuthenticationInput } from '@/tests/domain/mocks'

describe('Authentication', () => {
  let url: string
  let httpPostClient: MockProxy<HttpPostClient>
  let sut: Authentication

  beforeAll(() => {
    url = 'any_url'
    httpPostClient = mock()
    httpPostClient.post.mockResolvedValue({
      statusCode: HttpStatusCode.noContent,
    })
  })

  beforeEach(() => {
    sut = setupAuthentication(url, httpPostClient)
  })

  it('Should call HttpPostClient with correct URL and body', async () => {
    await sut(mockAuthenticationInput())
    expect(httpPostClient.post).toHaveBeenCalledWith({
      url,
      body: mockAuthenticationInput(),
    })
  })

  it('Should throw if HttpPostClient returns 401', async () => {
    httpPostClient.post.mockResolvedValueOnce({
      statusCode: HttpStatusCode.unauthorized,
    })
    const promise = sut(mockAuthenticationInput())
    await expect(promise).rejects.toThrow(new InvalidCredentialsError())
  })
})
