export interface HttpPostClient {
  post: (input: HttpPostClient.Input) => Promise<HttpPostClient.Output>
}

export namespace HttpPostClient {
  export type Input = {
    url: string
  }

  export type Output = Promise<void>
}
