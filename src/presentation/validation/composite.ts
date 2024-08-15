import { FieldValidation } from '@/presentation/protocols'

export class ValidationComposite {
  constructor(private readonly validators: FieldValidation[]) {}

  validate(field: string, value: any): string {
    const validators = this.validators.filter((v) => v.field === field)
    for (const validator of validators) {
      const error = validator.validate(value)
      if (error) return error
    }
  }
}
