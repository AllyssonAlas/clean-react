import { useContext } from 'react'

import { SurveyModel } from '@/domain/models'
import { SurveyContext } from '@/presentation/contexts'

import './styles.scss'

type Props = {
  answer: SurveyModel['answers'][0]
}

export const SurveyAnswer: React.FC<Props> = ({ answer }: Props) => {
  const { onAnswer } = useContext(SurveyContext)
  const activeClassName = answer.isCurrentAccountAnswer ? 'active' : ''
  const handleClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>): void => {
    if (e.currentTarget.classList.contains('active')) return
    onAnswer(answer.answer)
  }
  return (
    <li
      className={['answerWrap', activeClassName].join(' ')}
      data-testid='answer-wrap'
      key={answer.answer}
      onClick={handleClick}
    >
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
