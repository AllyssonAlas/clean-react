import { mock, MockProxy } from 'jest-mock-extended'

import { SurveyListApiModel } from '@/domain/models/externals'
import { setupLoadSurveyList, LoadSurveyList } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'

import { mockSurveyListApi } from '@/tests/domain/mocks'

describe('LoadSurveyList', () => {
  let url: string
  let httpGetClient: MockProxy<HttpGetClient<SurveyListApiModel>>
  let sut: LoadSurveyList

  beforeAll(() => {
    url = 'any_url'
    httpGetClient = mock()
    httpGetClient.get.mockResolvedValue({
      statusCode: 200,
      body: mockSurveyListApi(),
    })
  })

  beforeEach(() => {
    sut = setupLoadSurveyList(url, httpGetClient)
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

  it('Should return a SurveyModel list if HttpPostClient returns 200', async () => {
    const apiOutput = mockSurveyListApi()
    const useCaseOutput = apiOutput.map(({ date, ...survey }) => ({
      ...survey,
      date: new Date(date),
    }))

    httpGetClient.get.mockResolvedValueOnce({
      statusCode: 200,
      body: apiOutput,
    })

    const result = await sut()

    expect(result).toEqual(useCaseOutput)
  })

  it('Should return a SurveyModel list if HttpPostClient returns 200', async () => {
    httpGetClient.get.mockResolvedValueOnce({
      statusCode: HttpStatusCode.noContent,
      body: [],
    })

    const result = await sut()

    expect(result).toEqual([])
  })
})
