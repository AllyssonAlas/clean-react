import { ValidationBuilder as Builder, ValidationComposite } from '@/presentation/validation'

export const makeSignupValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.field('name').required().min(5).build(),
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
    ...Builder.field('passwordConfirmation').required().sameAs('password').build(),
  ])
}
