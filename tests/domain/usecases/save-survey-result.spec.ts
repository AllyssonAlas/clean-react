import { mock, MockProxy } from 'jest-mock-extended'

import { setupSaveSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { HttpClient } from '@/domain/contracts/gateways'

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
  })

  beforeEach(() => {
    sut = setupSaveSurveyResult(url, httpClient)
  })

  it('Should call HttpClient with correct input', async () => {
    await sut(input)

    expect(httpClient.request).toHaveBeenCalledWith({ url, method: 'put', params: input })
    expect(httpClient.request).toHaveBeenCalledTimes(1)
  })
})
