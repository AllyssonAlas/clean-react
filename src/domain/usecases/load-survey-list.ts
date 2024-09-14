import { SurveyModel } from '@/domain/models'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { SurveyListApiModel } from '@/domain/contracts/models'
import { UnexpectedError } from '@/domain/errors'

type Output = Array<SurveyModel>
export type LoadSurveyList = () => Promise<Output>
type Setup = (url: string, httpGetClient: HttpGetClient<SurveyListApiModel>) => LoadSurveyList

export const setupLoadSurveyList: Setup = (url, httpGetClient) => {
  return async () => {
    const { statusCode, body } = await httpGetClient.get({ url })
    switch (statusCode) {
      case HttpStatusCode.ok:
      case HttpStatusCode.noContent:
        return body
      default:
        throw new UnexpectedError()
    }
  }
}
