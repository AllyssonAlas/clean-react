import { useContext } from 'react'

import { SurveyContext } from '@/presentation/contexts'
import { SurveyItem, SurveyEmptyList } from '@/presentation/pages/SurveyList/components'

import './styles.scss'

export const ListItem: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <ul className='listWrap' data-testid='survey-list'>
      {state.surveys.length ? (
        state.surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
      ) : (
        <SurveyEmptyList />
      )}
    </ul>
  )
}
