import * as morgan from "morgan";
import { MORGAN_FORMAT_STRING } from "./morgan.constants";
import { NestjsWinstonLoggerService } from "../nestjs-winston-logger.service";

interface MorganOptions {
  skip?: (request?: Request, response?: Response) => boolean;
  format?: string;
}

const normalizeOptions = (
  options: string | MorganOptions,
  defaultFormat: string,
): MorganOptions => {
  if (!options) {
    return { format: defaultFormat };
  }

  if (typeof options === "string") {
    return { format: options };
  }

  return {
    ...options,
    format: options.format ?? defaultFormat,
  };
};

export const morganRequestLogger = (
  logger: NestjsWinstonLoggerService,
  morganOptions: string | MorganOptions = MORGAN_FORMAT_STRING.REQUEST,
) => {
  const options = normalizeOptions(morganOptions, MORGAN_FORMAT_STRING.REQUEST);

  return morgan(options.format, {
    immediate: true,
    skip: options?.skip,
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });
};

export const morganResponseLogger = (
  logger: NestjsWinstonLoggerService,
  morganOptions: string | MorganOptions = MORGAN_FORMAT_STRING.RESPONSE,
) => {
  const options = normalizeOptions(
    morganOptions,
    MORGAN_FORMAT_STRING.RESPONSE,
  );

  return morgan(options.format, {
    skip: options?.skip,
    stream: {
      write: (message: string) => {
        logger.log(message);
      },
    },
  });
};
