import axios, { AxiosResponse } from 'axios'

import { HttpPostClient } from '@/domain/contracts/gateways'

export class AxiosHttpClient implements HttpPostClient {
  async post({ url, params }: HttpPostClient.Input): Promise<HttpPostClient.Output> {
    let response: AxiosResponse
    try {
      response = await axios.post(url, params)
    } catch (error) {
      if (error.response) {
        response = error.response
      } else {
        throw error
      }
    }
    return {
      body: response.data,
      statusCode: response.status,
    }
  }
}
