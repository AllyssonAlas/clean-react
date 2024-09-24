import { SurveyModel } from '@/domain/models'
import { HttpClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { SurveyListApiModel } from '@/domain/models/externals'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type Output = Array<SurveyModel>
export type LoadSurveyList = () => Promise<Output>
type Setup = (url: string, httpClient: HttpClient<SurveyListApiModel>) => LoadSurveyList

export const setupLoadSurveyList: Setup = (url, httpClient) => {
  return async () => {
    const { statusCode, body } = await httpClient.request({ url, method: 'get' })
    switch (statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.noContent:
        return body.map(({ date, ...survey }) => ({
          ...survey,
          date: new Date(date),
        }))
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
