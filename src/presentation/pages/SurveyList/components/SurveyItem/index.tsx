import { Icon } from '@/presentation/components'

import './styles.scss'

export const SurveyItem: React.FC = () => {
  return (
    <li className={'surveyItemWrap'}>
      <div className={'surveyContent'}>
        <Icon className={'iconWrap'} iconName={'thumbDown'} />
        <time>
          <span className={'day'}>22</span>
          <span className={'month'}>03</span>
          <span className={'year'}>2020</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>Ver Resultado</footer>
    </li>
  )
}
