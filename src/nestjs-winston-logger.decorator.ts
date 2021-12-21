import { Inject } from "@nestjs/common";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";

type WinstonMetadata = { [key:string]: string | boolean | number };

/**
 * Hold all unique logger context
 * @name loggerContexts
 */
const loggerContexts = new Map<string, WinstonMetadata>();

/**
 * format unique provider token
 * @name getLoggerToken
 */
export function getLoggerToken(context: string): string {
  return `${NestjsWinstonLoggerService.name}:${context}`;
}

/**
 * Custom decorator for easy inject LoggerService
 * @param context - prefer input your service name
 */
export function InjectLogger(context = "", metadata: { [key:string]: string | boolean | number } = {}) {
  loggerContexts.set(context, metadata);
  return Inject(getLoggerToken(context));
}

export function getLoggerContextMetadata(context: string) {
  return loggerContexts.get(context);
}

export function getLoggerContexts() {
  return [...loggerContexts.keys()];
}
