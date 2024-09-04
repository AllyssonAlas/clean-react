import axios, { AxiosResponse } from 'axios'

import { HttpPostClient, HttpGetClient } from '@/domain/contracts/gateways'

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

  async get({ url }: HttpGetClient.Input): Promise<HttpGetClient.Output> {
    try {
      const { data, status } = await axios.get(url)
      return { body: data, statusCode: status }
    } catch (error) {
      return {
        body: error.response.data,
        statusCode: error.response.status,
      }
    }
  }
}
