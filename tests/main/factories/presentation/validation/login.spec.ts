import { ValidationComposite, Required, RequiredEmail, RequiredMinLength } from '@/presentation/validation'
import { makeLoginValidation } from '@/main/factories/presentation/validation'

describe('LoginValidationFactory', () => {
  it('Should make ValidationComposite with correct validations', () => {
    const composite = makeLoginValidation()

    expect(composite).toEqual(
      new ValidationComposite([
        new Required('email'),
        new RequiredEmail('email'),
        new Required('password'),
        new RequiredMinLength('password', 5),
      ]),
    )
  })
})
