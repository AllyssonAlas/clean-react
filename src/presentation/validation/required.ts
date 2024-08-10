import { FieldValidation } from '@/presentation/protocols'
import { RequiredFieldError } from '@/presentation/errors'

export class Required implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): string | undefined {
    if (!input[this.field]) {
      return new RequiredFieldError().message
    }
  }
}
