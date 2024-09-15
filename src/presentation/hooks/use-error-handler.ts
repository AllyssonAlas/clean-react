import { AccessDeniedError } from '@/domain/errors'
import { useLogout } from '@/presentation/hooks'

type Callback = (error: Error) => void
type Output = Callback

export const useErrorHandler = (callback: Callback): Output => {
  const logout = useLogout()
  return (error: Error) => {
    if (error instanceof AccessDeniedError) logout()
    else callback(error)
  }
}
