import { SurveyModel } from '@/domain/models'
import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { UnexpectedError } from '@/domain/errors'

export type LoadSurveyList = () => Promise<void>
type Setup = (url: string, httpGetClient: HttpGetClient<Array<SurveyModel>>) => LoadSurveyList

export const setupLoadSurveyList: Setup = (url, httpGetClient) => {
  return async () => {
    const { statusCode } = await httpGetClient.get({ url })
    switch (statusCode) {
      case HttpStatusCode.ok:
        break
      default:
        throw new UnexpectedError()
    }
  }
}
