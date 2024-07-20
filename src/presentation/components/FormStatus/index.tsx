import { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'
import { Spinner } from '@/presentation/components'

import './styles.scss'

export const FormStatus: React.FC = () => {
  const { loading, errorMessage } = useContext(FormContext)

  return (
    <div data-testid={'error-wrap'} className={'errorWrap'}>
      {loading && <Spinner className={'spinner'} />}
      {errorMessage && <span className={'error'}>{errorMessage}</span>}
    </div>
  )
}
