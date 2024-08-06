import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Authentication } from '@/domain/usecases'
import { FormContext, ContextData } from '@/presentation/contexts'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import './styles.scss'

type Props = {
  authentication?: Authentication
  validation?: Validation
}

export const Login: React.FC<Props> = ({ authentication, validation }) => {
  const navigate = useNavigate()
  const [state, setState] = useState<ContextData['state']>({
    loading: false,
    email: '',
    password: '',
    formError: '',
    emailError: '',
    passwordError: '',
  })
  const isSubmitDisabled = !!state.emailError || !!state.passwordError || state.loading
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      if (isSubmitDisabled) return
      setState((prevState) => ({ ...prevState, loading: true }))
      const { accessToken } = await authentication(state)
      localStorage.setItem('accessToken', accessToken)
      navigate('/', { replace: true })
    } catch (error) {
      setState((prevState) => ({
        ...prevState,
        loading: false,
        formError: error.message,
      }))
    }
  }
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
        <form className={'form'} data-testid={'form'} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <button className={'submit'} data-testid={'submit'} disabled={isSubmitDisabled} type='submit'>
            Entrar
          </button>
          <Link className={'link'} data-testid={'signup'} to={'/signup'}>
            Criar conta
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
