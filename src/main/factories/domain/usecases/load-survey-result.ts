import { LoadSurveyResult, setupLoadSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/infra/gateways'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeLoadSurveyResult = (id: string): LoadSurveyResult => {
  return setupLoadSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
