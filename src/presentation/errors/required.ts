export class RequiredFieldError extends Error {
  constructor() {
    super('Field is required')
    this.name = 'RequiredFieldError'
  }
}

export class RequiredEmailError extends Error {
  constructor() {
    super('Field requires an email')
    this.name = 'RequiredEmailError'
  }
}

export class RequiredMinLengthError extends Error {
  constructor(length: number) {
    super(`Field requires at least ${length} characters`)
    this.name = 'RequiredMinLengthError'
  }
}
