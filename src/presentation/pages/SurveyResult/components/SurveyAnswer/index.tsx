import { SurveyModel } from '@/domain/models'

import './styles.scss'

type Props = {
  answer: SurveyModel['answers'][0]
}

export const SurveyAnswer: React.FC<Props> = ({ answer }: Props) => {
  const activeClassName = answer.isCurrentAccountAnswer ? 'active' : ''
  return (
    <li className={['answerWrap', activeClassName].join(' ')} data-testid='answer-wrap' key={answer.answer}>
      {answer.image && <img data-testid='image' src={answer.image} alt={answer.answer} />}
      <span data-testid='answer' className={'answer'}>
        {answer.answer}
      </span>
      <span data-testid='percent' className={'percent'}>
        {answer.percent}%
      </span>
    </li>
  )
}
