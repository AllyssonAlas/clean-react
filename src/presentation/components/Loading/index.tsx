import { Spinner } from '@/presentation/components'

import './styles.scss'

export const Loading: React.FC = () => {
  return (
    <div className={'loadingWrap'} data-testid='loading'>
      <div className={'loading'}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}
