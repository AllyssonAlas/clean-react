import { useParams } from 'react-router-dom'

import { SurveyResult } from '@/presentation/pages'
import { makeLoadSurveyResult, makeSaveSurveyResult } from '@/main/factories/domain/usecases'

type RouteParams = {
  id: string
}

export const MakeSurveyResult: React.FC = () => {
  const { id } = useParams<RouteParams>()
  return <SurveyResult loadSurveyResult={makeLoadSurveyResult(id)} saveSurveyResult={makeSaveSurveyResult(id)} />
}
