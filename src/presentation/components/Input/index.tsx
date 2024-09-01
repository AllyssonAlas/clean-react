import { useContext, useRef } from 'react'

import { FormContext } from '@/presentation/contexts'

import './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>()
  const { state, setState } = useContext(FormContext)
  const error = state[`${props.name}Error`]

  return (
    <div data-testid={`${props.name}-wrap`} className={'inputWrap'} data-status={error ? 'invalid' : 'valid'}>
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=' '
        data-testid={props.name}
        onChange={({ target }) => {
          setState({ ...state, [target.name]: target.value })
        }}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current.focus()
        }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}
