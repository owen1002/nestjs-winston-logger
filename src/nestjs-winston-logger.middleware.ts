import { Request, Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { v4 as uuidv4 } from "uuid";

export const appendIdToRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.headers["request-id"]){
    const uuid = uuidv4();
    req.headers["request-id"] = uuid;
  }
  next();
};

export const appendRequestIdToLogger = (logger: NestjsWinstonLoggerService) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  logger.appendDefaultMeta("request-id", req.headers["request-id"] as string);
  next();
};
