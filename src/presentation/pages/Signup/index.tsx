import { useEffect, useState } from 'react'

import { FormContext } from '@/presentation/contexts'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import './styles.scss'

type Props = {
  validation?: Validation
}

export const SignUp: React.FC<Props> = ({ validation }) => {
  const [state, setState] = useState({
    loading: false,
    name: '',
    formError: '',
    nameError: '',
    emailError: 'Campo obrigatório',
    passwordError: 'Campo obrigatório',
    passwordConfirmationError: 'Campo obrigatório',
  })

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      nameError: validation.validate('name', state),
    }))
  }, [state.name])

  return (
    <div className={'signup'}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState } as any}>
        <form className={'form'}>
          <h2>Criar Conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />
          <button className={'submit'} data-testid='submit' disabled type='submit'>
            Entrar
          </button>
          <span className={'link'}>Voltar Para Login</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
