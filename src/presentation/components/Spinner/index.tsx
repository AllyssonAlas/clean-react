import './styles.scss'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

export const Spinner: React.FC<Props> = (props: Props) => {
  const negativeClass = props.isNegative ? 'negative' : ''

  return (
    <div {...props} className={['spinner', negativeClass, props.className].join(' ')} data-testid={'spinner'}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
