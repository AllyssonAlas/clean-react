import { SurveyModel } from '@/domain/models/'
import { SurveyApiModel } from '@/domain/models/externals'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type Output = SurveyModel
export type LoadSurveyResult = () => Promise<Output>
type Setup = (url: string, httpGetClient: HttpGetClient<SurveyApiModel>) => LoadSurveyResult

export const setupLoadSurveyResult: Setup = (url, httpGetClient) => {
  return async () => {
    const { statusCode, body } = await httpGetClient.get({ url })
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
