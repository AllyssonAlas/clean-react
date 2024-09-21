import { mock, MockProxy } from 'jest-mock-extended'

import { setupLoadSurveyResult, LoadSurveyResult } from '@/domain/usecases'
import { HttpGetClient } from '@/domain/contracts/gateways'

describe('LoadSurveyResult', () => {
  let url: string
  let httpGetClient: MockProxy<HttpGetClient>
  let sut: LoadSurveyResult

  beforeAll(() => {
    url = 'any_url'
    httpGetClient = mock()
  })

  beforeEach(() => {
    sut = setupLoadSurveyResult(url, httpGetClient)
  })

  it('Should call HttpGetClient with correct input', async () => {
    await sut()

    expect(httpGetClient.get).toHaveBeenCalledWith({ url })
    expect(httpGetClient.get).toHaveBeenCalledTimes(1)
  })
})
