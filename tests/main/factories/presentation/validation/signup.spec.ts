import {
  ValidationComposite,
  Required,
  RequiredEmail,
  RequiredMinLength,
  RequiredComparison,
} from '@/presentation/validation'
import { makeSignupValidation } from '@/main/factories/presentation/validation'

describe('SignUpValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeSignupValidation()

    expect(composite).toEqual(
      new ValidationComposite([
        new Required('name'),
        new RequiredMinLength('name', 5),
        new Required('email'),
        new RequiredEmail('email'),
        new Required('password'),
        new RequiredMinLength('password', 5),
        new Required('passwordConfirmation'),
        new RequiredComparison('passwordConfirmation', 'password'),
      ]),
    )
  })
})
