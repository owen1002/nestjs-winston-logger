import { DynamicModule } from "@nestjs/common";
import { LoggerOptions } from "winston";
export declare class LoggerModule {
    static forRoot(options: LoggerOptions): DynamicModule;
}
