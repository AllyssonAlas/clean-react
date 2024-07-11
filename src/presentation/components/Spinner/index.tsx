import './styles.scss'

type Props = React.HTMLAttributes<HTMLElement>

export const Spinner: React.FC<Props> = (props: Props) => {
  return (
    <div {...props} className={['spinner', props.className].join(' ')}>
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}
