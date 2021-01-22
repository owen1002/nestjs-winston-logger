import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { IncomingMessage } from "http";
import { v4 as uuidv4 } from "uuid";

export const appendRequestIdToLogger = (
  logger: NestjsWinstonLoggerService,
  label: string,
  value: string,
) => (req: Request, res: Response, next: NextFunction) => {
  logger.appendDefaultMeta("request-id", req["request-id"]);
  next();
};
