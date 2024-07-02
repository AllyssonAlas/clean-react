export enum HttpStatusCode {
  unauthorized = 401,
  noContent = 204,
}

type HttpResponse = {
  statusCode: HttpStatusCode
  body?: any
}

export interface HttpPostClient {
  post: (input: HttpPostClient.Input) => Promise<HttpPostClient.Output>
}

export namespace HttpPostClient {
  export type Input = {
    url: string
    body?: any
  }

  export type Output = HttpResponse
}
