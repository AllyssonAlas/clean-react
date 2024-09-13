import { useState, useEffect } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { Header, Footer } from '@/presentation/components'
import { SurveyEmptyList, SurveyItem } from './components'

import './styles.scss'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  })

  useEffect(() => {
    loadSurveyList().then((surveys) => setState({ surveys }))
  }, [])

  return (
    <div className={'surveyListWrap'}>
      <Header />
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          {state.surveys.length ? (
            state.surveys.map((survey) => <SurveyItem key={survey.id} survey={survey} />)
          ) : (
            <SurveyEmptyList />
          )}
        </ul>
      </div>
      <Footer />
    </div>
  )
}
