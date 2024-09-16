import { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'
import { Spinner } from '@/presentation/components'

import './styles.scss'

export const FormStatus: React.FC = () => {
  const {
    state: { loading, formError },
  } = useContext(FormContext)

  return (
    <div data-testid={'error-wrap'} className={'formStatusWrap'}>
      {loading && <Spinner className={'spinner'} />}
      {formError && (
        <span className={'error'} data-testid={'main-error'}>
          {formError}
        </span>
      )}
    </div>
  )
}
