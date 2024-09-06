import { Header, Icon, Footer } from '@/presentation/components'

import './styles.scss'

export const SurveyList: React.FC = () => {
  return (
    <div className={'surveyListWrap'}>
      <Header />
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <ul>
          <li>
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
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
