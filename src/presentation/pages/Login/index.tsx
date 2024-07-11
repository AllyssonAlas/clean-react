import { LoginHeader } from '@/presentation/components/LoginHeader'
import { Spinner } from '@/presentation/components/Spinner'
import { Footer } from '@/presentation/components/Footer'

import './styles.scss'

export const Login: React.FC = () => {
  return (
    <div className={'login'}>
      <LoginHeader />
      <form className={'form'}>
        <h2>Login</h2>
        <div className={'inputWrap'}>
          <input type='email' name='email' placeholder='Digite seu e-mail' />
          <span className={'status'}>🔴</span>
        </div>
        <div className={'inputWrap'}>
          <input type='password' name='password' placeholder='Digite sua senha' />
          <span className={'status'}>🔴</span>
        </div>
        <button className={'submit'} type='submit'>
          Entrar
        </button>
        <span className={'link'}>Criar conta</span>
        <div className={'errorWrap'}>
          <Spinner className={'spinner'} />
          <span className={'error'}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  )
}
