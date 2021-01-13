import { DynamicModule, Module } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { NESTJS_WINSTON_CONFIG_OPTIONS } from "./nestjs-winston-logger.constants";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";

@Module({})
export class NestjsWinstonLoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: NestjsWinstonLoggerModule,
      providers: [
        {
          provide: NESTJS_WINSTON_CONFIG_OPTIONS,
          useValue: options,
        },
        NestjsWinstonLoggerService,
      ],
      exports: [NestjsWinstonLoggerService],
    };
  }
}
