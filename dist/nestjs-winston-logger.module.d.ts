import { DynamicModule } from "@nestjs/common";
import { LoggerOptions } from "winston";
export declare class NestjsWinstonLoggerModule {
    static forRoot(options: LoggerOptions): DynamicModule;
}
