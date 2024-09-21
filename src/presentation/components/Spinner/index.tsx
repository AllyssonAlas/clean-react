import './styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

export const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? 'negative' : ''

  return (
    <div {...props} className={['spinner', negativeClass, props.className].join(' ')} data-testid={'spinner'}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
