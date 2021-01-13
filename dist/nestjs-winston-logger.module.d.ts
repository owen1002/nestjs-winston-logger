import { DynamicModule } from "@nestjs/common";
import { LoggerOptions } from "winston";
export declare class NestJsWinstonLoggerModule {
    static forRoot(options: LoggerOptions): DynamicModule;
}
