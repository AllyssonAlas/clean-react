import { SaveSurveyResult, setupSaveSurveyResult } from '@/domain/usecases'
import { makeApiUrl } from '@/main/factories/infra/gateways'
import { makeAuthorizeHttpClientDecorator } from '@/main/factories/main/decorators'

export const makeSaveSurveyResult = (id: string): SaveSurveyResult => {
  return setupSaveSurveyResult(makeApiUrl(`/surveys/${id}/results`), makeAuthorizeHttpClientDecorator())
}
