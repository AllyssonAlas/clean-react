export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
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
