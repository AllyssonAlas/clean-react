import { createContext } from 'react'

export type ContextData = {
  loading: boolean
  formError: string
  emailError: string
  passwordError: string
}

export const FormContext = createContext<ContextData>(null)
