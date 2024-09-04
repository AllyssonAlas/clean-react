import axios from 'axios'

import { AxiosHttpClient } from '@/infra/gateways'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  let input: {
    url: string
    params: object
  }
  let fakeAxios: jest.Mocked<typeof axios>
  let sut: AxiosHttpClient

  beforeAll(() => {
    input = { url: 'any_url', params: { any: 'any' } }
    fakeAxios = axios as jest.Mocked<typeof axios>
  })

  beforeEach(() => {
    sut = new AxiosHttpClient()
  })

  describe('post', () => {
    beforeAll(() => {
      fakeAxios.post.mockResolvedValue({ data: 'any_data', status: 200 })
    })

    it('Should call post with correct input', async () => {
      await sut.post(input)

      expect(fakeAxios.post).toHaveBeenCalledWith('any_url', { any: 'any' })
      expect(fakeAxios.post).toHaveBeenCalledTimes(1)
    })

    it('Should return correct output on success', async () => {
      const output = await sut.post(input)

      expect(output).toEqual({
        body: 'any_data',
        statusCode: 200,
      })
    })

    it('Should return correct output on http error', async () => {
      fakeAxios.post.mockRejectedValueOnce({ response: { data: 'any_data', status: 400 } })

      const output = await sut.post(input)

      expect(output).toEqual({ body: 'any_data', statusCode: 400 })
    })

    it('Should rethrow error if axios throw', async () => {
      fakeAxios.post.mockRejectedValueOnce(new Error('axios_client_error'))

      const promise = sut.post(input)

      await expect(promise).rejects.toThrow(new Error('axios_client_error'))
    })
  })

  describe('get', () => {
    beforeAll(() => {
      fakeAxios.get.mockResolvedValue({ data: 'any_data', status: 200 })
    })

    it('Should call get with correct input', async () => {
      await sut.get(input)

      expect(fakeAxios.get).toHaveBeenCalledWith('any_url')
      expect(fakeAxios.get).toHaveBeenCalledTimes(1)
    })

    it('Should return correct output on success', async () => {
      const output = await sut.get(input)

      expect(output).toEqual({ body: 'any_data', statusCode: 200 })
    })

    it('Should return correct output on http error', async () => {
      fakeAxios.get.mockRejectedValueOnce({ response: { data: 'any_data', status: 400 } })

      const output = await sut.get(input)

      expect(output).toEqual({ body: 'any_data', statusCode: 400 })
    })
  })
})
