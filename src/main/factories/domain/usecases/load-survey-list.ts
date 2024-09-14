import { LoadSurveyList, setupLoadSurveyList } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/infra/gateways'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeLoadSurveyList = (): LoadSurveyList => {
  return setupLoadSurveyList(makeApiUrl('/surveys'), makeAuthorizeHttpClientDecorator())
}
