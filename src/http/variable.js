// http 状态码
export const HttpStatusCode = Object.freeze({
  OK: 200,
  Accepted: 202,
  Unauthorized: 401,
  Forbidden: 403,
  NotFound: 404,
  InternalServerError: 500,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504
})


// 业务逻辑响应码
export const ResponseCode = Object.freeze({
  Success: 200,
  Warning: 300,
  Error: 400
})