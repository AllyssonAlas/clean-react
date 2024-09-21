import { Spinner } from '@/presentation/components'

import './styles.scss'

export const Loading: React.FC = () => {
  return (
    <div className={'loadingWrap'}>
      <div className={'loading'}>
        <span>Aguarde...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}
