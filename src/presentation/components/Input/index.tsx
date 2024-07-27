import { useContext } from 'react'

import { FormContext } from '@/presentation/contexts'

import './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  const getTitle = (): string => error || 'Tudo certo!'
  const getStatus = (): string => (error ? '🔴' : '🟢')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setState((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }
  return (
    <div className={'inputWrap'}>
      <input data-testid={props.name} onChange={handleChange} {...props} />
      <span className={'status'} data-testid={`${props.name}-status`} title={getTitle()}>
        {getStatus()}
      </span>
    </div>
  )
}
