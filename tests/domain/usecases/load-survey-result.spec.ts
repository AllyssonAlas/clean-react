import { mock, MockProxy } from 'jest-mock-extended'

import { SurveyApiModel } from '@/domain/models/externals'
import { setupLoadSurveyResult, LoadSurveyResult } from '@/domain/usecases'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

import { mockSurveyApiModel } from '@/tests/domain/mocks'

describe('LoadSurveyResult', () => {
  let url: string
  let httpClient: MockProxy<HttpClient<SurveyApiModel>>
  let sut: LoadSurveyResult

  beforeAll(() => {
    url = 'any_url'
    httpClient = mock()
    httpClient.request.mockResolvedValue({ statusCode: 200, body: mockSurveyApiModel() })
  })

  beforeEach(() => {
    sut = setupLoadSurveyResult(url, httpClient)
  })

  it('Should call HttpClient with correct input', async () => {
    await sut()

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'get' })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })

  it('Should throw AccessDenied if HttpPostClient returns 403', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.forbidden,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpClient.request.mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should return a SurveyModel list if HttpPostClient returns 200', async () => {
    const apiOutput = mockSurveyApiModel()
    httpClient.request.mockResolvedValueOnce({ statusCode: 200, body: apiOutput })

    const result = await sut()

    expect(result).toEqual({ ...apiOutput, date: new Date(apiOutput.date) })
  })
})
