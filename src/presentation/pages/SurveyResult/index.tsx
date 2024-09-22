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
  const [state, setState] = useState({
    loading: false,
    error: '',
    survey: null as SurveyModel,
  })

  useEffect(() => {
    loadSurveyResult().then((survey) => setState((prevState) => ({ ...prevState, survey })))
  }, [])

  return (
    <div className={'surveyResultWrap'}>
      <Header />
      <div className={'contentWrap'} data-testid='survey-result'>
        {state.survey && (
          <>
            <hgroup>
              <Calendar date={state.survey.date} className={'calendarWrap'} />
              <h2 data-testid='question'>{state.survey.question}</h2>
            </hgroup>
            <FlipMove className={'answersList'} data-testid='answers'>
              {state.survey.answers.map((answer) => (
                <li
                  className={answer.isCurrentAccountAnswer ? 'active' : ''}
                  data-testid='answer-wrap'
                  key={answer.answer}
                >
                  {answer.image && <img data-testid='image' src={answer.image} alt={answer.answer} />}
                  <span data-testid='answer' className={'answer'}>
                    {answer.answer}
                  </span>
                  <span data-testid='percent' className={'percent'}>
                    {answer.percent}%
                  </span>
                </li>
              ))}
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
