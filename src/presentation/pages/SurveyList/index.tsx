import { Header, Footer } from '@/presentation/components'
import { SurveyEmptyList } from './components'

import './styles.scss'

export const SurveyList: React.FC = () => {
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
