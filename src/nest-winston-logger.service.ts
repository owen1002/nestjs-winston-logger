import { Inject, Injectable, Logger, Scope } from "@nestjs/common";
import { createLogger, LoggerOptions, Logger as WinstonLogger } from "winston";
import { NEST_WINSTON_CONFIG_OPTIONS } from "./nest-winston-logger.constants";

@Injectable({ scope: Scope.TRANSIENT })
export class NestWinstonLoggerService extends Logger {
  private config: LoggerOptions;
  private logger: WinstonLogger;

  constructor(@Inject(NEST_WINSTON_CONFIG_OPTIONS) config: LoggerOptions) {
    super();
    this.config = config;
    this.logger = createLogger(this.config);
  }

  setContext(serviceName: string) {
    this.logger.defaultMeta = { service: serviceName };
  }

  log(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}
