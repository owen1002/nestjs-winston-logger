import { DynamicModule, FactoryProvider, Module } from "@nestjs/common";
import { LoggerOptions } from "winston";
import { NESTJS_WINSTON_CONFIG_OPTIONS } from "./nestjs-winston-logger.constants";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import {
  getLoggerContextMetadata,
  getLoggerContexts,
  getLoggerToken,
} from "./nestjs-winston-logger.decorator";

export type ContextOverrides = {
  /**
   * context is the token used in @InjectLogger.
   * For example, @InjectLogger(AUTH_LOG) where const AUTH_LOG = "AUTH_LOG"
   */
  [context:string]: LoggerOptions
};


@Module({})
export class NestjsWinstonLoggerModule {
  /**
   * 
   * @param defaultOptions - logger options used if no override is specified for the context
   * @param overrides - logger options that completely replace defaultOptions if an override is specified
   *        for a specific context
   * @returns 
   */
  static forRoot(defaultOptions: LoggerOptions, overrides: ContextOverrides = {}): DynamicModule {

    const contexts = getLoggerContexts();

    const loggerProviders: FactoryProvider<NestjsWinstonLoggerService>[] = contexts.map(
      (context) => {

        let hasOverride = overrides && overrides[context];
        let loggerOptions =  hasOverride ? overrides[context] : defaultOptions;
        
        return {
          provide: getLoggerToken(context),
          useFactory: () => {
            const logger = new NestjsWinstonLoggerService(loggerOptions);
            const metadata = getLoggerContextMetadata(context);
            if (!hasOverride && !metadata.service) {
              metadata["service"] = context;
            }

            logger.setContext(metadata);
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
          useValue: defaultOptions,
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