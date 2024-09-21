import './styles.scss'

type Props = {
  error: string
  reload: () => void
}

export const Error: React.FC<Props> = ({ error, reload }: Props) => {
  return (
    <div className={'errorWrap'}>
      <span data-testid='error'>{error}</span>
      <button data-testid='reload' onClick={reload}>
        Tentar novamente
      </button>
    </div>
  )
}
