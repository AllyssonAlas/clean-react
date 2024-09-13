import { useState, useEffect } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext } from '@/presentation/contexts'
import { Header, Footer } from '@/presentation/components'
import { ListItem, Error } from './components'

import './styles.scss'

type Props = {
  loadSurveyList?: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false,
  })

  useEffect(() => {
    loadSurveyList()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch((error) => setState((prevState) => ({ ...prevState, error: error.message })))
  }, [state.reload])

  return (
    <div className={'surveyListWrap'}>
      <Header />
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error /> : <ListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
