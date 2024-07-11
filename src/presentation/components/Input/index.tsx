import './styles.scss'

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const Input: React.FC<Props> = (props: Props) => {
  return (
    <div className={'inputWrap'}>
      <input {...props} />
      <span className={'status'}>🔴</span>
    </div>
  )
}
