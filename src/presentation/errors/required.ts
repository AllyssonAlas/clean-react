export class RequiredFieldError extends Error {
  constructor() {
    super('Campo obrigatório')
    this.name = 'RequiredFieldError'
  }
}

export class RequiredEmailError extends Error {
  constructor() {
    super('Campo requer um email')
    this.name = 'RequiredEmailError'
  }
}

export class RequiredMinLengthError extends Error {
  constructor(length: number) {
    super(`Campo requer pelo menos ${length} caracteres`)
    this.name = 'RequiredMinLengthError'
  }
}
