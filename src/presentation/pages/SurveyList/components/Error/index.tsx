import { useContext } from 'react'

import { SurveyContext } from '@/presentation/contexts'

import './styles.scss'

export const Error: React.FC = () => {
  const { state, setState } = useContext(SurveyContext)
  const reload = () => {
    setState((prevState) => ({ surveys: [], error: '', reload: !prevState.reload }))
  }
  return (
    <div>
      <span data-testid='error'>{state.error}</span>
      <button data-testid='reload' onClick={reload}>
        Tentar novamente
      </button>
    </div>
  )
}
