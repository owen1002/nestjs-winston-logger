import * as morgan from "morgan";
import { MORGAN_FORMAT_STRING } from "./morgan.constants";
import { NestjsWinstonLoggerService } from "../nestjs-winston-logger.service";

interface MorganOptions {
  skip?: (request: Request, response: Response) => boolean;
  immediate?: boolean;
}

export const morganRequestLogger = (
  logger: NestjsWinstonLoggerService,
  morganFormatString: string = MORGAN_FORMAT_STRING.REQUEST,
  options: MorganOptions = {},
) =>
  morgan(morganFormatString, {
    immediate: options?.immediate ?? true,
    skip: options?.skip,
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });

export const morganResponseLogger = (
  logger: NestjsWinstonLoggerService,
  morganFormatString: string = MORGAN_FORMAT_STRING.RESPONSE,
  options: MorganOptions = {},
) =>
  morgan(morganFormatString, {
    skip: options?.skip,
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });
