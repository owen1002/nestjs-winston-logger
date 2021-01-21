import * as morgan from "morgan";
import { MORGAN_FORMAT_STRING } from "./morgan.constants";
import { NestjsWinstonLoggerService } from "../nestjs-winston-logger.service";

export const morganRequestLogger = (logger: NestjsWinstonLoggerService) =>
  morgan(MORGAN_FORMAT_STRING.REQUEST, {
    immediate: true,
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });

export const morganResponseLogger = (logger: NestjsWinstonLoggerService) =>
  morgan(MORGAN_FORMAT_STRING.RESPONSE, {
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });
