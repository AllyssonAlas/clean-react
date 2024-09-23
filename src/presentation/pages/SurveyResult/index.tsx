import { useState, useEffect } from 'react'

import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { Survey } from './components'
import { useErrorHandler } from '@/presentation/hooks'

import './styles.scss'

type Props = {
  loadSurveyResult: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, survey: null, error: error.message }))
  })
  const reload = (): void => setState((old) => ({ survey: null, error: '', reload: !old.reload, loading: false }))
  const [state, setState] = useState({
    loading: false,
    error: '',
    survey: null as SurveyModel,
    reload: false,
  })

  useEffect(() => {
    loadSurveyResult()
      .then((survey) => setState((prevState) => ({ ...prevState, survey })))
      .catch(handleError)
  }, [state.reload])

  return (
    <div className={'surveyResultWrap'}>
      <Header />
      <div className={'contentWrap'} data-testid='survey-result'>
        {state.survey && <Survey survey={state.survey} />}
        {state.loading && <Loading />}
        {state.error && <Error error={state.error} reload={reload} />}
      </div>
      <Footer />
    </div>
  )
}
