import { ConsoleLogger } from "@nestjs/common";
import { LoggerOptions } from "winston";
export declare class NestjsWinstonLoggerService extends ConsoleLogger {
    private logger;
    constructor(config: LoggerOptions);
    setContext(serviceName: string): void;
    appendDefaultMeta(key: string, value: string): void;
    log(message: string): void;
    error(message: string, trace: string): void;
    warn(message: string): void;
    debug(message: string): void;
    verbose(message: string): void;
}
