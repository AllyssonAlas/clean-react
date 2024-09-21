import { mock, MockProxy } from 'jest-mock-extended'

import { setupLoadSurveyResult, LoadSurveyResult } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

describe('LoadSurveyResult', () => {
  let url: string
  let httpGetClient: MockProxy<HttpGetClient>
  let sut: LoadSurveyResult

  beforeAll(() => {
    url = 'any_url'
    httpGetClient = mock()
    httpGetClient.get.mockResolvedValue({ statusCode: 200 })
  })

  beforeEach(() => {
    sut = setupLoadSurveyResult(url, httpGetClient)
  })

  it('Should call HttpGetClient with correct input', async () => {
    await sut()

    expect(httpGetClient.get).toHaveBeenCalledWith({ url })
    expect(httpGetClient.get).toHaveBeenCalledTimes(1)
  })

  it('Should throw AccessDenied if HttpPostClient returns 403', async () => {
    httpGetClient.get.mockResolvedValueOnce({
      statusCode: HttpStatusCode.forbidden,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new AccessDeniedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 404', async () => {
    httpGetClient.get.mockResolvedValueOnce({
      statusCode: HttpStatusCode.notFound,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  it('Should throw UnexpectedError if HttpPostClient returns 500', async () => {
    httpGetClient.get.mockResolvedValueOnce({
      statusCode: HttpStatusCode.serverError,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })
})
