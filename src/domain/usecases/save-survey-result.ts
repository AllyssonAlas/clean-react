import { SurveyModel } from '@/domain/models/'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type Input = { answer: string }
type Output = SurveyModel
export type SaveSurveyResult = (input: Input) => Promise<Output>
type Setup = (url: string, httpClient: HttpClient<Input, Output>) => SaveSurveyResult

export const setupSaveSurveyResult: Setup = (url, httpClient) => {
  return async (input) => {
    const { statusCode, body } = await httpClient.request({ url, method: 'put', params: input })
    switch (statusCode) {
      case HttpStatusCode.ok:
        return { ...body, date: new Date(body.date) }
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
