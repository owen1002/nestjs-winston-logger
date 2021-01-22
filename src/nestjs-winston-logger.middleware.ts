import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";

export const appendIdToRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const uuid = uuidv4();
  Object.assign(req, { requestId: uuid });
  next();
};

export const appendRequestIdToLogger = (
  logger: NestjsWinstonLoggerService,
) => (req: Request, res: Response, next: NextFunction) => {
  logger.appendDefaultMeta("request-id", req["requestId"]);
  next();
};
