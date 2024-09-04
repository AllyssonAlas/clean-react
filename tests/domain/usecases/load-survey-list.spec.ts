import { mock, MockProxy } from 'jest-mock-extended'

import { SurveyModel } from '@/domain/models'
import { setupLoadSurveyList, LoadSurveyList } from '@/domain/usecases'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { UnexpectedError } from '@/domain/errors'

import { mockLoadSurveyListOutput } from '@/tests/domain/mocks'

describe('LoadSurveyList', () => {
  let url: string
  let httpGetClient: MockProxy<HttpGetClient<SurveyModel[]>>
  let sut: LoadSurveyList

  beforeAll(() => {
    url = 'any_url'
    httpGetClient = mock()
    httpGetClient.get.mockResolvedValue({
      statusCode: 200,
      body: mockLoadSurveyListOutput(),
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

  it('Should throw UnexpectedError if HttpPostClient returns 403', async () => {
    httpGetClient.get.mockResolvedValueOnce({
      statusCode: HttpStatusCode.forbidden,
    })

    const promise = sut()

    await expect(promise).rejects.toThrow(new UnexpectedError())
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
    const result = await sut()

    expect(result).toEqual(mockLoadSurveyListOutput())
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
