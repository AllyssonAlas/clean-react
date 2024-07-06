import axios from 'axios'

import { HttpPostClient } from '@/domain/contracts/gateways'

export class AxiosHttpClient {
  async post({ url, params }: HttpPostClient.Input): Promise<HttpPostClient.Output> {
    try {
      const { data, status } = await axios.post(url, params)
      return { body: data, statusCode: status }
    } catch (error) {
      if (error.response) {
        return {
          body: error.response.data,
          statusCode: error.response.status,
        }
      }
    }
  }
}
