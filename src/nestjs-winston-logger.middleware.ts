import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";

export interface CustomizedRequest extends IncomingMessage {
  reqId: string;
}

export const appendIdToRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = uuidv4();
  Object.assign(req, { reqId: uuid });
  next();
};

export const appendRequestIdToLogger = (logger: NestjsWinstonLoggerService) => (
  req: CustomizedRequest,
  res: Response,
  next: NextFunction,
) => {
  logger.appendDefaultMeta("Request-id", req.reqId);
  next();
};
