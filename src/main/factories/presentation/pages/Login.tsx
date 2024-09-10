import { Login } from '@/presentation/pages'
import { makeAuthentication, makeUpdateCurrentAccount } from '@/main/factories/domain/usecases'
import { makeLoginValidation } from '@/main/factories/presentation/validation'

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeAuthentication()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
      validation={makeLoginValidation()}
    />
  )
}
