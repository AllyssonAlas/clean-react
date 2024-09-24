import { SurveyModel } from '@/domain/models/'
import { SurveyApiModel } from '@/domain/models/externals'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type Output = SurveyModel
export type LoadSurveyResult = () => Promise<Output>
type Setup = (url: string, httpClient: HttpClient<SurveyApiModel>) => LoadSurveyResult

export const setupLoadSurveyResult: Setup = (url, httpClient) => {
  return async () => {
    const { statusCode, body } = await httpClient.request({ url, method: 'get' })
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
