export interface Validation {
  validate(fieldName: string, input: object): string | undefined
}

export interface FieldValidation {
  field: string
  validate(input: object): string | undefined
}
