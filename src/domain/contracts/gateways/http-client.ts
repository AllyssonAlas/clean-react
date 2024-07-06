export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  notFound = 404,
  serverError = 500,
}

export interface HttpPostClient<T = any, R = any> {
  post: (input: HttpPostClient.Input<T>) => Promise<HttpPostClient.Output<R>>
}

export namespace HttpPostClient {
  export type Input<T = any> = {
    url: string
    params?: T
  }

  export type Output<R = any> = {
    statusCode: HttpStatusCode
    body?: R
  }
}
