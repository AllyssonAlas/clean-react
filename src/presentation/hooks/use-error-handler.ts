import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { AccessDeniedError } from '@/domain/errors'
import { AccountContext } from '@/presentation/contexts'

type Callback = (error: Error) => void
type Output = Callback

export const useErrorHandler = (callback: Callback): Output => {
  const { setCurrentAccount } = useContext(AccountContext)
  const navigate = useNavigate()
  return (error: Error) => {
    if (error instanceof AccessDeniedError) {
      setCurrentAccount(null)
      navigate('/login', { replace: true })
    } else {
      callback(error)
    }
  }
}
