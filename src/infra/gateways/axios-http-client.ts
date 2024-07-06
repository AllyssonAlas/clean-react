import axios from 'axios'

import { HttpPostClient } from '@/domain/contracts/gateways'

export class AxiosHttpClient {
  async post({ url, body }: HttpPostClient.Input): Promise<any> {
    await axios.post(url, body)
  }
}
