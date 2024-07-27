import './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

export const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={['spinner', props.className].join(' ')} data-testid={'spinner'}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
