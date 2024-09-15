import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccountContext } from '@/presentation/contexts'
import { Logo } from '@/presentation/components'

import './styles.scss'

export const Header: React.FC = () => {
  const { setCurrentAccount } = useContext(AccountContext)
  const navigate = useNavigate()
  const logout = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault()
    setCurrentAccount(null)
    navigate('/login', { replace: true })
  }
  return (
    <header className={'headerWrap'}>
      <div className={'headerContent'}>
        <Logo />
        <div className={'logoutWrap'}>
          <span>Rodrigo</span>
          <a data-testid='logout' href='#' onClick={logout}>
            Sair
          </a>
        </div>
      </div>
    </header>
  )
}
