import { DynamicModule, FactoryProvider, Module } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { NESTJS_WINSTON_CONFIG_OPTIONS } from "./nestjs-winston-logger.constants";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import {
  getLoggerContexts,
  getLoggerToken,
} from "./nestjs-winston-logger.decorator";

export type ContextOverrides = {
  /**
   * context is the token used in @InjectLogger.
   * For example, @InjectLogger(AUTH_LOG) where const AUTH_LOG = "AUTH_LOG"
   */
  [context:string]:LoggerOptions
};

export type LoggerConfig = {
  /**
   * Logger configuration used if no overrides provided
   */
  defaultConfig:LoggerOptions,

  /**
   * Provides logger configuration specific to the provided logger context
   */
  overrides?: ContextOverrides
};


@Module({})
export class NestjsWinstonLoggerModule {
  static forRoot(options: LoggerOptions | LoggerConfig): DynamicModule {
    let config = getLoggerConfig(options);

    const contexts = getLoggerContexts();

    const loggerProviders: FactoryProvider<NestjsWinstonLoggerService>[] = contexts.map(
      (context) => {

        let hasOverride = config.overrides && config.overrides[context];
        let loggerOptions =  hasOverride ? config.overrides[context] : config.defaultConfig;
        return {
          provide: getLoggerToken(context),
          useFactory: () => {
            const logger = new NestjsWinstonLoggerService(loggerOptions);
            logger.setContext(hasOverride ? { context:context } : context);
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

function getLoggerConfig(options?:LoggerOptions | LoggerConfig):LoggerConfig {
  return instanceOfLoggerConfig(options) ? options : { defaultConfig:options };
}

function instanceOfLoggerConfig(object:LoggerOptions | LoggerConfig): object is LoggerConfig {
  return object != null && 'defaultConfig' in object;
}