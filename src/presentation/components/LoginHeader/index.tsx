import React, { memo } from 'react'

import { Logo } from '@/presentation/components/Logo'

import './styles.scss'

export const LoginHeader: React.FC = memo(() => {
  return (
    <header className={'header'}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  )
})
