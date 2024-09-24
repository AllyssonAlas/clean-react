import { HttpClient } from '@/domain/contracts/gateways'

type Input = { answer: string }
export type SaveSurveyResult = (input: Input) => Promise<void>
type Setup = (url: string, httpClient: HttpClient<Input>) => SaveSurveyResult

export const setupSaveSurveyResult: Setup = (url, httpClient) => {
  return async (input) => {
    await httpClient.request({ url, method: 'put', params: input })
  }
}
