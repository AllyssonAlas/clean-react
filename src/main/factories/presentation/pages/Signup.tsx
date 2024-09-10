import { SignUp } from '@/presentation/pages'
import { makeAddAccount, makeUpdateCurrentAccount } from '@/main/factories/domain/usecases'
import { makeSignupValidation } from '@/main/factories/presentation/validation'

export const MakeSignup: React.FC = () => {
  return (
    <SignUp
      addAccount={makeAddAccount()}
      updateCurrentAccount={makeUpdateCurrentAccount()}
      validation={makeSignupValidation()}
    />
  )
}
