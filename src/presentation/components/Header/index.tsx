import { useContext } from 'react'

import { AccountContext } from '@/presentation/contexts'
import { useLogout } from '@/presentation/hooks'
import { Logo } from '@/presentation/components'

import './styles.scss'

export const Header: React.FC = () => {
  const logout = useLogout()
  const { getCurrentAccount } = useContext(AccountContext)
  const handleLogout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    logout()
  }
  return (
    <header className={'headerWrap'}>
      <div className={'headerContent'}>
        <Logo />
        <div className={'logoutWrap'}>
          <span data-testid='username'>{getCurrentAccount().name}</span>
          <a data-testid='logout' href='#' onClick={handleLogout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}
