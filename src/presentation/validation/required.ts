import { RequiredFieldError } from '@/presentation/errors'

export class Required {
  constructor(readonly field: string) {}

  validate(input: object): string {
    return new RequiredFieldError().message
  }
}
