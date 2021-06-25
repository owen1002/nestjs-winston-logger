import { DynamicModule, FactoryProvider, Module } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { NESTJS_WINSTON_CONFIG_OPTIONS } from "./nestjs-winston-logger.constants";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import {
  getLoggerContexts,
  getLoggerToken,
} from "./nestjs-winston-logger.decorator";

@Module({})
export class NestjsWinstonLoggerModule {
  static forRoot(options: LoggerOptions): DynamicModule {
    const contexts = getLoggerContexts();

    const loggerProviders: FactoryProvider<NestjsWinstonLoggerService>[] = contexts.map(
      (context) => {
        return {
          provide: getLoggerToken(context),
          useFactory: () => {
            const logger = new NestjsWinstonLoggerService(options);
            logger.setContext(context);
            return logger;
          },
        };
      },
    );

    return {
      module: NestjsWinstonLoggerModule,
      providers: [
        {
          provide: NESTJS_WINSTON_CONFIG_OPTIONS,
          useValue: options,
        },
        NestjsWinstonLoggerService,
        ...loggerProviders,
      ],
      exports: [
        NestjsWinstonLoggerService,
        ...contexts.map((context) => getLoggerToken(context)),
      ],
    };
  }
}
