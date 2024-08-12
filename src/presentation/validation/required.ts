import { FieldValidation } from '@/presentation/protocols'
import { RequiredFieldError, RequiredMinLengthError } from '@/presentation/errors'

export class Required implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): string | undefined {
    if (!input[this.field]) {
      return new RequiredFieldError().message
    }
  }
}

export class RequiredMinLength {
  constructor(
    readonly field: string,
    private readonly length: number,
  ) {}

  validate(input: object): string {
    return new RequiredMinLengthError(this.length).message
  }
}
