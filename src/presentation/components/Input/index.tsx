import { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

import './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const value = useContext(FormContext)
  const error = value[`${props.name}Error`]
  const getTitle = (): string => error
  const getStatus = (): string => '🔴'
  return (
    <div className={'inputWrap'}>
      <input {...props} />
      <span className={'status'} data-testid={`${props.name}-status`} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  )
}
