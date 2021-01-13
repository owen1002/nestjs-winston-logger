import { DynamicModule, Module } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { NEST_WINSTON_CONFIG_OPTIONS } from "./nest-winston-logger.constants";
import { NestWinstonLoggerService } from "./nest-winston-logger.service";

@Module({})
export class LoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    return {
      module: LoggerModule,
      providers: [
        {
          provide: NEST_WINSTON_CONFIG_OPTIONS,
          useValue: options,
        },
        NestWinstonLoggerService,
      ],
      exports: [NestWinstonLoggerService],
    };
  }
}
