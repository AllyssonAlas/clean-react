import { useParams } from 'react-router-dom'

import { SurveyResult } from '@/presentation/pages'
import { makeLoadSurveyResult } from '@/main/factories/domain/usecases'

type RouteParams = {
  id: string
}

export const MakeSurveyResult: React.FC = () => {
  const { id } = useParams<RouteParams>()
  return <SurveyResult loadSurveyResult={makeLoadSurveyResult(id)} />
}
