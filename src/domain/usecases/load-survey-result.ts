import { HttpGetClient } from '@/domain/contracts/gateways'

export type LoadSurveyResult = () => Promise<void>
type Setup = (url: string, httpGetClient: HttpGetClient) => LoadSurveyResult

export const setupLoadSurveyResult: Setup = (url, httpGetClient) => {
  return async () => {
    await httpGetClient.get({ url })
  }
}
