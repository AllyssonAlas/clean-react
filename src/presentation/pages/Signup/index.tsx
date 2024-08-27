import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { AddAccount, SaveAccessToken } from '@/domain/usecases'
import { FormContext } from '@/presentation/contexts'
import { LoginHeader, Input, SubmitButton, FormStatus, Footer } from '@/presentation/components'
import { Validation } from '@/presentation/protocols'

import './styles.scss'

type Props = {
  addAccount?: AddAccount
  saveAccessToken?: SaveAccessToken
  validation?: Validation
}

export const SignUp: React.FC<Props> = ({ addAccount, saveAccessToken, validation }) => {
  const navigate = useNavigate()
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
    !!state.nameError ||
    !!state.emailError ||
    !!state.passwordError ||
    !!state.passwordConfirmationError ||
    state.loading
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    try {
      if (isSubmitDisabled) return
      setState((prevState) => ({ ...prevState, loading: true }))
      const { accessToken } = await addAccount(state)
      await saveAccessToken({ token: accessToken })
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
          <SubmitButton disabled={isSubmitDisabled} text='Cadastrar' />
          <Link to='/login' className={'link'} data-testid='login'>
            Voltar Para Login
          </Link>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  )
}
