import { useState, useEffect } from 'react'

import { LoadSurveyResult, SaveSurveyResult } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { Header, Footer, Loading, Error } from '@/presentation/components'
import { Survey } from './components'
import { useErrorHandler } from '@/presentation/hooks'

import './styles.scss'
import { SurveyContext } from '@/presentation/contexts'

type Props = {
  loadSurveyResult: LoadSurveyResult
  saveSurveyResult: SaveSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult, saveSurveyResult }) => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, survey: null, loading: false, error: error.message }))
  })
  const reload = (): void => setState((old) => ({ survey: null, error: '', reload: !old.reload, loading: false }))
  const onAnswer = async (answer: string): Promise<void> => {
    setState((prevState) => ({ ...prevState, loading: true }))
    saveSurveyResult({ answer }).catch(handleError)
  }
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
      <SurveyContext.Provider value={{ onAnswer }}>
        <div className={'contentWrap'} data-testid='survey-result'>
          {state.survey && <Survey survey={state.survey} />}
          {state.loading && <Loading />}
          {state.error && <Error error={state.error} reload={reload} />}
        </div>
      </SurveyContext.Provider>
      <Footer />
    </div>
  )
}
