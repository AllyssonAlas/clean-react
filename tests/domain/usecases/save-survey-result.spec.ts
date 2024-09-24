import { mock, MockProxy } from 'jest-mock-extended'

import { setupSaveSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

describe('SaveSurveyResult', () => {
  let input: {
    answer: string
  }
  let url: string
  let httpClient: MockProxy<HttpClient<{ answer: string }>>
  let sut: SaveSurveyResult

  beforeAll(() => {
    input = { answer: 'any_answer' }
    url = 'any_url'
    httpClient = mock()
    httpClient.request.mockResolvedValue({ statusCode: 200 })
  })

  beforeEach(() => {
    sut = setupSaveSurveyResult(url, httpClient)
  })

  it('Should call HttpClient with correct input', async () => {
    await sut(input)

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'put', params: input })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw AccessDenied if HttpPostClient returns 403', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.forbidden,
    })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound,
    })

    const promise = sut(input)

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
