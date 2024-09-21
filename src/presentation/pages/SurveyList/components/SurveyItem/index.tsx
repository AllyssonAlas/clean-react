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
      <footer>Ver Resultado</footer>
    </li>
  )
}
