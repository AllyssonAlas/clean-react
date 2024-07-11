import { Spinner } from '@/presentation/components/Spinner'

import './styles.scss'

export const FormStatus: React.FC = () => {
  return (
    <div className={'errorWrap'}>
      <Spinner className={'spinner'} />
      <span className={'error'}>Erro</span>
    </div>
  )
}
