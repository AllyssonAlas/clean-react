import { Login } from '@/presentation/pages'
import { makeAuthentication } from '@/main/factories/domain/usecases'
import { makeLoginValidation } from '@/main/factories/presentation/validation'

export const MakeLogin: React.FC = () => {
  return <Login authentication={makeAuthentication()} validation={makeLoginValidation()} />
}
