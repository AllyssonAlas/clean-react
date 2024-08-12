export class RequiredMinLengthError extends Error {
  constructor(length: number) {
    super(`Field requires at least ${length} characters`)
    this.name = 'RequiredMinLengthError'
  }
}
