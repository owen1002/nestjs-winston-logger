export enum TOKEN_TYPE {
  Request,
  Response,
}

export const MORGAN_FORMAT_STRING = {
  REQUEST: `[:date[iso]] request-url::url :remote-addr ":method  HTTP/:http-version"`,
  RESPONSE: `[:date[iso]] status::status content-length::res[content-length] total-time-ms::total-time[3]`,
};
