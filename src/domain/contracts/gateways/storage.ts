export interface SetStorage<T = any> {
  set: (input: SetStorage.Input<T>) => void
}

export namespace SetStorage {
  export type Input<T = any> = {
    key: string
    value: T
  }
}
