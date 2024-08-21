export interface SetStorage<T = any> {
  set: (input: SetStorage.Input<T>) => Promise<void>
}

export namespace SetStorage {
  export type Input<T = any> = {
    key: string
    value: T
  }
}
