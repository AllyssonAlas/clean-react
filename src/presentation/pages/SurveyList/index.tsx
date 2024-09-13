import { useState, useEffect } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext } from '@/presentation/contexts'
import { Header, Footer } from '@/presentation/components'
import { ListItem } from './components'

import './styles.scss'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
  })

  useEffect(() => {
    loadSurveyList().then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
  }, [])

  return (
    <div className={'surveyListWrap'}>
      <Header />
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          <ListItem />
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
