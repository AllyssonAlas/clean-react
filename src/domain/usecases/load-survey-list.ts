import { HttpGetClient } from '@/domain/contracts/gateways'

export type LoadSurveyList = () => Promise<void>
type Setup = (url: string, httpGetClient: HttpGetClient) => LoadSurveyList

export const setupLoadSurveyList: Setup = (url, httpGetClient) => {
  return async () => {
    await httpGetClient.get({ url })
  }
}
