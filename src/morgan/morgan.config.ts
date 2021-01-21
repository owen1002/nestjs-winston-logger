import * as morgan from "morgan";
import { Response, Request } from "express";
import { TOKEN_TYPE } from "./morgan.constants";

export const configMorgan = {
  appendMorganToken: (
    token: string,
    tokenType: TOKEN_TYPE,
    morganToken: string,
  ) =>
    morgan.token(morganToken, (req: Request, res: Response) => {
      if (tokenType === TOKEN_TYPE.Request) return req[token];
      else return res[token];
    }),
};
