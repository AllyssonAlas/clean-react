import './styles.scss'

type Props = {
  date: Date
  className?: string
}

export const Calendar: React.FC<Props> = ({ date, className }: Props) => {
  return (
    <time className={['calendarWrap', className].join(' ')}>
      <span data-testid='day' className={'day'}>
        {date.getDate().toString().padStart(2, '0')}
      </span>
      <span data-testid='month' className={'month'}>
        {date.toLocaleString('pt-BR', { month: 'short' }).replace('.', '')}
      </span>
      <span data-testid='year' className={'year'}>
        {date.getFullYear()}
      </span>
    </time>
  )
}
