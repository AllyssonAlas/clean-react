import { SurveyModel } from '@/domain/models'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { SurveyListApiModel } from '@/domain/models/externals'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

type Output = Array<SurveyModel>
export type LoadSurveyList = () => Promise<Output>
type Setup = (url: string, httpGetClient: HttpGetClient<SurveyListApiModel>) => LoadSurveyList

export const setupLoadSurveyList: Setup = (url, httpGetClient) => {
  return async () => {
    const { statusCode, body } = await httpGetClient.get({ url })
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
