import { useState, useEffect } from 'react'
import FlipMove from 'react-flip-move'

import { LoadSurveyResult } from '@/domain/usecases'
import { SurveyModel } from '@/domain/models'
import { Header, Footer, Loading, Calendar, Error } from '@/presentation/components'

import './styles.scss'

type Props = {
  loadSurveyResult?: LoadSurveyResult
}

export const SurveyResult: React.FC<Props> = ({ loadSurveyResult }) => {
  const [state] = useState({
    loading: false,
    error: '',
    surveyResult: null as SurveyModel,
  })

  useEffect(() => {
    loadSurveyResult()
  }, [])

  return (
    <div className={'surveyResultWrap'}>
      <Header />
      <div className={'contentWrap'} data-testid='survey-result'>
        {state.surveyResult && (
          <>
            <hgroup>
              <Calendar date={new Date()} className={'calendarWrap'} />
              <h2>
                Qual é seu framework web favorito? Qual é seu framework web favorito? Qual é seu framework web favorito?
              </h2>
            </hgroup>
            <FlipMove className={'answersList'}>
              <li>
                <img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
                <span className={'answer'}>ReactJS</span>
                <span className={'percent'}>50%</span>
              </li>
              <li className={'active'}>
                <img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
                <span className={'answer'}>ReactJS</span>
                <span className={'percent'}>50%</span>
              </li>
              <li>
                <img src='http://fordevs.herokuapp.com/static/img/logo-react.png' />
                <span className={'answer'}>ReactJS</span>
                <span className={'percent'}>50%</span>
              </li>
            </FlipMove>
            <button>Voltar</button>
          </>
        )}
        {state.loading && <Loading />}
        {state.error && <Error error={state.error} reload={() => {}} />}
      </div>
      <Footer />
    </div>
  )
}
