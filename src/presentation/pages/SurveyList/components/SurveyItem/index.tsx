import { Link } from 'react-router-dom'

import { SurveyModel } from '@/domain/models'
import { Icon, Calendar } from '@/presentation/components'

import './styles.scss'

type Props = {
  survey: SurveyModel
}

export const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={'surveyItemWrap'}>
      <div className={'surveyContent'}>
        <Icon className={'iconWrap'} iconName={survey.didAnswer ? 'thumbUp' : 'thumbDown'} />
        <Calendar date={survey.date} className={'calendarWrap'} />
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>
        <Link data-testid='link' to={`/surveys/${survey.id}`}>
          Ver Resultado
        </Link>
      </footer>
    </li>
  )
}
