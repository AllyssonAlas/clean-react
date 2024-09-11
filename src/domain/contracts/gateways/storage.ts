export interface SetStorage<T = any> {
  set: (input: SetStorage.Input<T>) => void
}

export namespace SetStorage {
  export type Input<T = any> = {
    key: string
    value: T
  }
}

export interface GetStorage<T = any> {
  get: (input: GetStorage.Input) => GetStorage.Output<T>
}

export namespace GetStorage {
  export type Input = {
    key: string
  }

  export type Output<T = any> = T
}
