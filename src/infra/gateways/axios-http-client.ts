import axios, { AxiosResponse } from 'axios'

import { HttpPostClient, HttpGetClient } from '@/domain/contracts/gateways'

export class AxiosHttpClient implements HttpPostClient, HttpGetClient {
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

  async get({ url, headers }: HttpGetClient.Input): Promise<HttpGetClient.Output> {
    let response: AxiosResponse
    try {
      response = await axios.get(url, { headers })
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
