import { useState, useEffect } from 'react'

import { SurveyModel } from '@/domain/models'
import { LoadSurveyList } from '@/domain/usecases'
import { SurveyContext } from '@/presentation/contexts'
import { useErrorHandler } from '@/presentation/hooks'
import { Header, Error, Footer } from '@/presentation/components'
import { ListItem } from './components'

import './styles.scss'

type Props = {
  loadSurveyList: LoadSurveyList
}

export const SurveyList: React.FC<Props> = ({ loadSurveyList }) => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, error: error.message }))
  })
  const reload = (): void => setState((old) => ({ surveys: [], error: '', reload: !old.reload }))

  const [state, setState] = useState({
    surveys: [] as SurveyModel[],
    error: '',
    reload: false,
  })

  useEffect(() => {
    loadSurveyList()
      .then((surveys) => setState((prevState) => ({ ...prevState, surveys })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={'surveyListWrap'}>
      <Header />
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <SurveyContext.Provider value={{ state, setState }}>
          {state.error ? <Error error={state.error} reload={reload} /> : <ListItem />}
        </SurveyContext.Provider>
      </div>
      <Footer />
    </div>
  )
}
