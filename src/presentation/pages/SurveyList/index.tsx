import { useEffect } from 'react'

import { LoadSurveyList } from '@/domain/usecases'
import { Header, Footer } from '@/presentation/components'
import { SurveyEmptyList } from './components'

import './styles.scss'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  useEffect(() => {
    loadSurveyList()
  }, [])

  return (
    <div className={'surveyListWrap'}>
      <Header />
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <ul data-testid='survey-list'>
          <SurveyEmptyList />
        </ul>
      </div>
      <Footer />
    </div>
  )
}
