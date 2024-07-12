import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'

import './styles.scss'

export const Login: React.FC = () => {
  return (
    <div className={'login'}>
      <LoginHeader />
      <form className={'form'}>
        <h2>Login</h2>
        <Input type='email' name='email' placeholder='Digite seu e-mail' />
        <Input type='password' name='password' placeholder='Digite sua senha' />
        <button className={'submit'} type='submit'>
          Entrar
        </button>
        <span className={'link'}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}
