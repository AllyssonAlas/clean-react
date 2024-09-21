import FlipMove from 'react-flip-move'

import { Header, Footer, Loading, Calendar } from '@/presentation/components'

import './styles.scss'

export const SurveyResult: React.FC = () => {
  return (
    <div className={'surveyResultWrap'}>
      <Header />
      <div className={'contentWrap'}>
        {false && (
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
        {false && <Loading />}
      </div>
      <Footer />
    </div>
  )
}
