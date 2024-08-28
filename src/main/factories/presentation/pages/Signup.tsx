import { SignUp } from '@/presentation/pages'
import { makeAddAccount, makeSaveAccessToken } from '@/main/factories/domain/usecases'
import { makeSignupValidation } from '@/main/factories/presentation/validation'

export const MakeSignup: React.FC = () => {
  return (
    <SignUp addAccount={makeAddAccount()} saveAccessToken={makeSaveAccessToken()} validation={makeSignupValidation()} />
  )
}
