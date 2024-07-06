import axios from 'axios'

import { AxiosHttpClient } from '@/infra/gateways'

jest.mock('axios')

describe('AxiosHttpClient', () => {
  it('Should call post with correct input', async () => {
    const fakeAxios = axios as jest.Mocked<typeof axios>
    const sut = new AxiosHttpClient()

    await sut.post({ url: 'any_url', body: { any: 'any' } })

    expect(fakeAxios.post).toHaveBeenCalledWith('any_url', { any: 'any' })
    expect(fakeAxios.post).toHaveBeenCalledTimes(1)
  })
})
