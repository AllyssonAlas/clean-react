import axios from 'axios'

import { AxiosHttpClient } from '@/infra/gateways'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let input: {
    url: string
    method: any
    params: object
    headers: object
  }
  let fakeAxios: jest.Mocked<typeof axios>
  let sut: AxiosHttpClient

  beforeAll(() => {
    fakeAxios = axios as jest.Mocked<typeof axios>
    fakeAxios.request.mockResolvedValue({ data: 'any_data', status: 200 })
    input = { url: 'any_url', method: 'post', params: { any: 'any' }, headers: { any: 'any' } }
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  it('Should call request with correct input', async () => {
    await sut.request(input)

    expect(fakeAxios.request).toHaveBeenCalledWith({
      url: 'any_url',
      method: 'post',
      data: { any: 'any' },
      headers: { any: 'any' },
    })
    expect(fakeAxios.request).toHaveBeenCalledTimes(1)
  })

  it('Should return correct output on success', async () => {
    const output = await sut.request(input)

    expect(output).toEqual({
      body: 'any_data',
      statusCode: 200,
    })
  })

  it('Should return correct output on http error', async () => {
    fakeAxios.request.mockRejectedValueOnce({ response: { data: 'any_data', status: 400 } })

    const output = await sut.request(input)

    expect(output).toEqual({ body: 'any_data', statusCode: 400 })
  })

  it('Should rethrow error if axios throw', async () => {
    fakeAxios.request.mockRejectedValueOnce(new Error('axios_client_error'))

    const promise = sut.request(input)

    await expect(promise).rejects.toThrow(new Error('axios_client_error'))
  })
})
