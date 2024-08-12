export class RequiredEmailError extends Error {
  constructor() {
    super('Field requires an email')
    this.name = 'RequiredEmailError'
  }
}
