export enum TOKEN_TYPE {
  Request,
  Response,
}

export const MORGAN_FORMAT_STRING = {
  REQUEST: `[:date[iso]] request-url::url :remote-addr ":method  HTTP/:http-version"`,
  RESPONSE: `[:date[iso]] content-length::res[content-length] total-time::total-time[3]ms`,
};
