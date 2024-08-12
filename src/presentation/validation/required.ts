import { FieldValidation } from '@/presentation/protocols'
import { RequiredFieldError, RequiredEmailError, RequiredMinLengthError } from '@/presentation/errors'

export class Required implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): string | undefined {
    if (!input[this.field]) {
      return new RequiredFieldError().message
    }
  }
}

export class RequiredEmail implements FieldValidation {
  constructor(readonly field: string) {}

  validate(input: object): string | undefined {
    const emailRegex =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    if (!emailRegex.test(input[this.field])) {
      return new RequiredEmailError().message
    }
  }
}

export class RequiredMinLength implements FieldValidation {
  constructor(
    readonly field: string,
    private readonly length: number,
  ) {}

  validate(input: object): string | undefined {
    if (input[this.field].length < this.length) {
      return new RequiredMinLengthError(this.length).message
    }
  }
}
