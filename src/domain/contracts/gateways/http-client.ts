export enum HttpStatusCode {
  ok = 200,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

type HttpResponse<BodyType> = {
  statusCode: HttpStatusCode
  body?: BodyType
}

export interface HttpPostClient<ReqType = any, ResType = any> {
  post: (input: HttpPostClient.Input<ReqType>) => Promise<HttpPostClient.Output<ResType>>
}

export namespace HttpPostClient {
  export type Input<ParamsType = any> = {
    url: string
    params?: ParamsType
  }

  export type Output<ResType = any> = HttpResponse<ResType>
}

export interface HttpGetClient<ResType = any> {
  get: (input: HttpGetClient.Input) => Promise<HttpGetClient.Output<ResType>>
}

export namespace HttpGetClient {
  export type Input = {
    url: string
  }

  export type Output<ResType = any> = HttpResponse<ResType>
}
