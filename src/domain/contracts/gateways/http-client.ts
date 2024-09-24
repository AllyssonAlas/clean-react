export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
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

export interface HttpClient<ReqType = any, ResType = any> {
  request: (input: HttpClient.Input<ReqType>) => Promise<HttpClient.Output<ResType>>
}

export namespace HttpClient {
  export type Input<ParamsType = any> = {
    url: string
    method: 'post' | 'get' | 'put' | 'delete'
    headers?: any
    params?: ParamsType
  }

  export type Output<ResType = any> = HttpResponse<ResType>
}
