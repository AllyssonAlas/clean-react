import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccountContext } from '@/presentation/contexts'

type Output = () => void

export const useLogout = (): Output => {
  const { setCurrentAccount } = useContext(AccountContext)
  const navigate = useNavigate()
  return () => {
    setCurrentAccount(null)
    navigate('/login', { replace: true })
  }
}
