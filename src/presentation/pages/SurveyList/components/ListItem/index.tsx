import { SurveyModel } from '@/domain/models'
import { SurveyItem, SurveyEmptyList } from '@/presentation/pages/SurveyList/components'

import './styles.scss'

type Props = {
  surveys: SurveyModel[]
}

export const ListItem: React.FC<Props> = ({ surveys }) => {
  return (
    <ul className='listWrap' data-testid='survey-list'>
      {surveys.length ? surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />) : <SurveyEmptyList />}
    </ul>
  )
}
