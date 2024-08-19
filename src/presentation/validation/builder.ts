import { FieldValidation } from '@/presentation/protocols'
import { Required, RequiredEmail, RequiredMinLength } from '@/presentation/validation'

export class ValidationBuilder {
  private constructor(
    private readonly field: string,
    private readonly validators: FieldValidation[],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName, [])
  }

  required(): ValidationBuilder {
    this.validators.push(new Required(this.field))
    return this
  }

  email(): ValidationBuilder {
    this.validators.push(new RequiredEmail(this.field))
    return this
  }

  min(length: number): ValidationBuilder {
    this.validators.push(new RequiredMinLength(this.field, length))
    return this
  }

  build(): FieldValidation[] {
    return this.validators
  }
}
