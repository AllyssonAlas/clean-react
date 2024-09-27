import { useNavigate } from 'react-router-dom'

import { SurveyModel } from '@/domain/models'
import { Calendar } from '@/presentation/components'
import { SurveyAnswer } from '../SurveyAnswer'

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
      <ul className={'answersList'} data-testid='answers'>
        {survey.answers.map((answer) => (
          <SurveyAnswer key={answer.answer} answer={answer} />
        ))}
      </ul>
      <button data-testid='back-button' className={'button'} onClick={() => navigate(-1)}>
        Voltar
      </button>
    </>
  )
}
