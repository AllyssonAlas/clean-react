import { createContext } from 'react'

export type ContextData = {
  loading: boolean
  errorMessage: string
}

export const FormContext = createContext<ContextData>(null)
