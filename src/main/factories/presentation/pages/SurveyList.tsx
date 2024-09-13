import { SurveyList } from '@/presentation/pages'
import { makeLoadSurveyList } from '@/main/factories/domain/usecases'

export const MakeSurveyList: React.FC = () => {
  return <SurveyList loadSurveyList={makeLoadSurveyList()} />
}
