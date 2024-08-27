import React from 'react'

type Props = {
  disabled?: boolean
  text: string
}

export const SubmitButton: React.FC<Props> = ({ disabled, text }: Props) => {
  return (
    <button data-testid='submit' disabled={disabled} type='submit'>
      {text}
    </button>
  )
}
