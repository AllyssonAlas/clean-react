import { ValidationBuilder as Builder, ValidationComposite } from '@/presentation/validation'

export const makeLoginValidation = (): ValidationComposite => {
  return new ValidationComposite([
    ...Builder.field('email').required().email().build(),
    ...Builder.field('password').required().min(5).build(),
  ])
}
