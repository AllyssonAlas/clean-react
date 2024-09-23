import { useNavigate } from 'react-router-dom'
import FlipMove from 'react-flip-move'

import { SurveyModel } from '@/domain/models'
import { Calendar } from '@/presentation/components'

import './styles.scss'

type Props = {
  survey: SurveyModel
}

export const Survey: React.FC<Props> = ({ survey }: Props) => {
  const navigate = useNavigate()

  return (
    <>
      <hgroup>
        <Calendar date={survey.date} className={'calendarWrap'} />
        <h2 data-testid='question'>{survey.question}</h2>
      </hgroup>
      <FlipMove className={'answersList'} data-testid='answers'>
        {survey.answers.map((answer) => (
          <li className={answer.isCurrentAccountAnswer ? 'active' : ''} data-testid='answer-wrap' key={answer.answer}>
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
      <button data-testid='back-button' className={'button'} onClick={() => navigate(-1)}>
        Voltar
      </button>
    </>
  )
}
