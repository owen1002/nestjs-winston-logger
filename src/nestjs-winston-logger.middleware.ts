import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";

export const appendRequestHeaderToLogger = (
  logger: NestjsWinstonLoggerService,
  label: string,
  value: string,
) => (req: Request, res: Response, next: NextFunction) => {
  logger.appendDefaultMeta(label, value);
  next();
};
