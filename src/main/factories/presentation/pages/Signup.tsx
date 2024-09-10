import { SignUp } from '@/presentation/pages'
import { makeAddAccount } from '@/main/factories/domain/usecases'
import { makeSignupValidation } from '@/main/factories/presentation/validation'

export const MakeSignup: React.FC = () => {
  return <SignUp addAccount={makeAddAccount()} validation={makeSignupValidation()} />
}
