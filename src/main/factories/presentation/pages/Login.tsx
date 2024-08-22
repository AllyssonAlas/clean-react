import { Login } from '@/presentation/pages'
import { makeAuthentication, makeSaveAccessToken } from '@/main/factories/domain/usecases'
import { makeLoginValidation } from '@/main/factories/presentation/validation'

export const MakeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeAuthentication()}
      saveAccessToken={makeSaveAccessToken()}
      validation={makeLoginValidation()}
    />
  )
}
