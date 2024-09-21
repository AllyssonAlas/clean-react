import { HttpGetClient, HttpStatusCode } from '@/domain/contracts/gateways'
import { AccessDeniedError, UnexpectedError } from '@/domain/errors'

export type LoadSurveyResult = () => Promise<void>
type Setup = (url: string, httpGetClient: HttpGetClient) => LoadSurveyResult

export const setupLoadSurveyResult: Setup = (url, httpGetClient) => {
  return async () => {
    const { statusCode } = await httpGetClient.get({ url })
    switch (statusCode) {
      case HttpStatusCode.ok:
        break
      case HttpStatusCode.forbidden:
        throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}
