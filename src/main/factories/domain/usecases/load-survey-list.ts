import { LoadSurveyList, setupLoadSurveyList } from '@/domain/usecases'
import { makeApiUrl, makeAxiosHttpClient } from '@/main/factories/infra/gateways'

export const makeLoadSurveyList = (): LoadSurveyList => {
  return setupLoadSurveyList(makeApiUrl('/surveys'), makeAxiosHttpClient())
}
