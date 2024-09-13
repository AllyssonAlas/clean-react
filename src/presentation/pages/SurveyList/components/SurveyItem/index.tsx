import { SurveyModel } from '@/domain/models'
import { Icon } from '@/presentation/components'

import './styles.scss'

type Props = {
  survey: SurveyModel
}

export const SurveyItem: React.FC<Props> = ({ survey }) => {
  return (
    <li className={'surveyItemWrap'}>
      <div className={'surveyContent'}>
        <Icon className={'iconWrap'} iconName={survey.didAnswer ? 'thumbUp' : 'thumbDown'} />
        <time>
          <span className={'day'} data-testid='day'>
            {survey.date.getDate().toString().padStart(2, '0')}
          </span>
          <span className={'month'} data-testid='month'>
            {survey.date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
          </span>
          <span className={'year'} data-testid='year'>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid='question'>{survey.question}</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}
