import { createContext } from 'react'

type Data = {
  onAnswer?: (answer: string) => void
}

export const SurveyContext = createContext<Data>(null)
