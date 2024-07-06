import axios from 'axios'

import { HttpPostClient } from '@/domain/contracts/gateways'

export class AxiosHttpClient {
  async post({ url, params }: HttpPostClient.Input): Promise<HttpPostClient.Output> {
    const { data, status } = await axios.post(url, params)
    return { body: data, statusCode: status }
  }
}
