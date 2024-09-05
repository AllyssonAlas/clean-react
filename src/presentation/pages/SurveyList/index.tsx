import { Logo, Footer } from '@/presentation/components'

import './styles.scss'

export const SurveyList: React.FC = () => {
  return (
    <div className={'surveyListWrap'}>
      <header className={'headerWrap'}>
        <div className={'headerContent'}>
          <Logo />
          <div className={'logoutWrap'}>
            <span>Rodrigo</span>
            <a href='#'>Sair</a>
          </div>
        </div>
      </header>
      <div className={'contentWrap'}>
        <h2>Enquetes</h2>
        <ul>
          <li>
            <div className={'surveyContent'}>
              <time>
                <span className={'day'}>22</span>
                <span className={'month'}>03</span>
                <span className={'year'}>2020</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={'surveyContent'}>
              <time>
                <span className={'day'}>22</span>
                <span className={'month'}>03</span>
                <span className={'year'}>2020</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={'surveyContent'}>
              <time>
                <span className={'day'}>22</span>
                <span className={'month'}>03</span>
                <span className={'year'}>2020</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={'surveyContent'}>
              <time>
                <span className={'day'}>22</span>
                <span className={'month'}>03</span>
                <span className={'year'}>2020</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
          <li>
            <div className={'surveyContent'}>
              <time>
                <span className={'day'}>22</span>
                <span className={'month'}>03</span>
                <span className={'year'}>2020</span>
              </time>
              <p>Qual é seu framework web favorito?</p>
            </div>
            <footer>Ver Resultado</footer>
          </li>
        </ul>
      </div>
      <Footer />
    </div>
  )
}
