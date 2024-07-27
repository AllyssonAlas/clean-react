import { useEffect, useState } from 'react'

import { FormContext, ContextData } from '@/presentation/contexts'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import './styles.scss'

type Props = {
  validation?: Validation
}

export const Login: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState<ContextData['state']>({
    loading: false,
    email: '',
    password: '',
    formError: '',
    emailError: '',
    passwordError: '',
  })
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      emailError: validation.validate('email', state.email),
      passwordError: validation.validate('password', state.password),
    }))
  }, [state.email, state.password])

  return (
    <div className={'login'}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
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
