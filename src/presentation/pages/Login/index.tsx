import { useState } from 'react'

import { FormContext, ContextData } from '@/presentation/contexts'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'

import './styles.scss'

export const Login: React.FC = () => {
  const [state] = useState<ContextData>({
    loading: false,
    errorMessage: '',
  })

  return (
    <div className={'login'}>
      <LoginHeader />
      <FormContext.Provider value={state}>
        <form className={'form'}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button className={'submit'} data-testid={'submit'} disabled type='submit'>
            Entrar
          </button>
          <span className={'link'}>Criar conta</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
