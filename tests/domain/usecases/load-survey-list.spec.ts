import { mock, MockProxy } from 'jest-mock-extended'

import { setupLoadSurveyList, LoadSurveyList } from '@/domain/usecases'
import { HttpGetClient } from '@/domain/contracts/gateways'

describe('LoadSurveyList', () => {
  let url: string
  let httpGetClient: MockProxy<HttpGetClient>
  let sut: LoadSurveyList

  beforeAll(() => {
    url = 'any_url'
    httpGetClient = mock()
  })

  beforeEach(() => {
    sut = setupLoadSurveyList(url, httpGetClient)
  })

  it('Should call HttpGetClient with correct input', async () => {
    await sut()

    expect(httpGetClient.get).toHaveBeenCalledWith({ url })
    expect(httpGetClient.get).toHaveBeenCalledTimes(1)
  })
})
