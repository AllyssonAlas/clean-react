import { createContext } from 'react'

type ContextState = {
  loading: boolean
  email: string
  password: string
  formError: string
  emailError: string
  passwordError: string
}

export type ContextData = {
  state: ContextState
  setState: React.Dispatch<React.SetStateAction<ContextState>>
}

export const FormContext = createContext<ContextData>(null)
