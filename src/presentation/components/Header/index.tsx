import { memo } from 'react'

import { Logo } from '@/presentation/components'

import './styles.scss'

export const Header: React.FC = memo(() => {
  return (
    <header className={'headerWrap'}>
      <div className={'headerContent'}>
        <Logo />
        <div className={'logoutWrap'}>
          <span>Rodrigo</span>
          <a href='#'>Sair</a>
        </div>
      </div>
    </header>
  )
})
