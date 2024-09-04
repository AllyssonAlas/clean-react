export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export interface HttpPostClient<ReqType = any, ResType = any> {
  post: (input: HttpPostClient.Input<ReqType>) => Promise<HttpPostClient.Output<ResType>>
}

export namespace HttpPostClient {
  export type Input<ParamsType = any> = {
    url: string
    params?: ParamsType
  }

  export type Output<Response = any> = {
    statusCode: HttpStatusCode
    body?: Response
  }
}

export interface HttpGetClient {
  get: (input: HttpGetClient.Input) => Promise<void>
}

export namespace HttpGetClient {
  export type Input = {
    url: string
  }
}
