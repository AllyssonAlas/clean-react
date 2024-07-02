import { mock, MockProxy } from 'jest-mock-extended'

import { Authentication, setupAuthentication } from '@/domain/usecases'
import { HttpPostClient } from '@/domain/contracts/gateways'

import { mockAuthenticationInput } from '@/tests/domain/mocks'

describe('Authentication', () => {
  let url: string
  let httpPostClient: MockProxy<HttpPostClient>
  let sut: Authentication

  beforeAll(() => {
    url = 'any_url'
    httpPostClient = mock()
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
})
