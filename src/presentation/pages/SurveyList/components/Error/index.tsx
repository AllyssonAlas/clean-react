import { useContext } from 'react'

import { SurveyContext } from '@/presentation/contexts'

import './styles.scss'

export const Error: React.FC = () => {
  const { state } = useContext(SurveyContext)
  return (
    <div>
      <span data-testid='error'>{state.error}</span>
      <button>Recarregar</button>
    </div>
  )
}
