import axios, { AxiosResponse } from 'axios'

import { HttpClient } from '@/domain/contracts/gateways'

export class AxiosHttpClient implements HttpClient {
  async request({ url, params, method, headers }: HttpClient.Input): Promise<HttpClient.Output> {
    let response: AxiosResponse
    try {
      response = await axios.request({ url, data: params, method, headers })
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
