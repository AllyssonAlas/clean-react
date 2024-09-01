import { useContext, useRef } from 'react'

import { FormContext } from '@/presentation/contexts'

import './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]
  return (
    <div className={'inputWrap'}>
      <input
        {...props}
        ref={inputRef}
        placeholder=' '
        data-testid={props.name}
        onChange={(e) => {
          setState({ ...state, [e.target.name]: e.target.value })
        }}
      />
      <label
        onClick={() => {
          inputRef.current.focus()
        }}
      >
        {props.placeholder}
      </label>
      <span data-testid={`${props.name}-status`} title={error || 'Tudo certo!'} className={'status'}>
        {error ? '🔴' : '🟢'}
      </span>
    </div>
  )
}
