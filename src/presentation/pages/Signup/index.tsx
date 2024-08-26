import { useEffect, useState } from 'react'

import { AddAccount } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { LoginHeader, Input, FormStatus, Footer } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import './styles.scss'

type Props = {
  addAccount?: AddAccount
  validation?: Validation
}

export const SignUp: React.FC<Props> = ({ addAccount, validation }) => {
  const [state, setState] = useState({
    loading: false,
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    formError: '',
    nameError: '',
    emailError: '',
    passwordError: '',
    passwordConfirmationError: '',
  })
  const isSubmitDisabled =
    !!state.nameError || !!state.emailError || !!state.passwordError || !!state.passwordConfirmationError
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setState((prevState) => ({ ...prevState, loading: true }))
    await addAccount(state)
  }
  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      nameError: validation.validate('name', state),
      emailError: validation.validate('email', state),
      passwordError: validation.validate('password', state),
      passwordConfirmationError: validation.validate('passwordConfirmation', state),
    }))
  }, [state.name, state.email, state.password, state.passwordConfirmation])

  return (
    <div className={'signup'}>
      <LoginHeader />
      <FormContext.Provider value={{ state, setState }}>
        <form className={'form'} data-testid='form' onSubmit={handleSubmit}>
          <h2>Criar Conta</h2>
          <Input type='text' name='name' placeholder='Digite seu nome' />
          <Input type='email' name='email' placeholder='Digite seu e-mail' />
          <Input type='password' name='password' placeholder='Digite sua senha' />
          <Input type='password' name='passwordConfirmation' placeholder='Repita sua senha' />
          <button className={'submit'} data-testid='submit' disabled={isSubmitDisabled} type='submit'>
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
