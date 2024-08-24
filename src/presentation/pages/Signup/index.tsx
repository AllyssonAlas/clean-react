import { Link } from 'react-router-dom'

import { FormContext } from '@/presentation/contexts'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'

import './styles.scss'

export const SignUp: React.FC = () => {
  return (
    <div className={'signup'}>
      <LoginHeader />
      <FormContext.Provider value={{ state: {} } as any}>
        <form className={'form'}>
          <h2>Criar Conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />
          <button className={'submit'} type='submit'>
            Entrar
          </button>
          <Link to='/login' className={'link'}>
            Voltar Para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
