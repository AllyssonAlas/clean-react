import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError } from '@/domain/errors'

type Input = { answer: string }
export type SaveSurveyResult = (input: Input) => Promise<void>
type Setup = (url: string, httpClient: HttpClient<Input>) => SaveSurveyResult

export const setupSaveSurveyResult: Setup = (url, httpClient) => {
  return async (input) => {
    const { statusCode } = await httpClient.request({ url, method: 'put', params: input })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return null
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
    }
  }
}
