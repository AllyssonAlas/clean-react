export class UnexpectedError extends Error {
  constructor() {
    super('Algo de inesperado aconteceu')
    this.name = 'UnexpectedError'
  }
}
