import axios from 'axios'

import { AxiosHttpClient } from '@/infra/gateways'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let input: {
    url: string
    body: object
  }
  let fakeAxios: jest.Mocked<typeof axios>
  let sut: AxiosHttpClient

  beforeAll(() => {
    input = { url: 'any_url', body: { any: 'any' } }
    fakeAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('Should call post with correct input', async () => {
    await sut.post(input)

    expect(fakeAxios.post).toHaveBeenCalledWith('any_url', { any: 'any' })
    expect(fakeAxios.post).toHaveBeenCalledTimes(1)
  })
})
