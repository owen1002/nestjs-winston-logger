import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LOG_TYPE } from "./nestjs-winston-logger.constants";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { getCircularReplacer } from "./utils";
import { composeContext, ExecutionContextType, RequestContext } from "./utils";

interface WinstonLoggingInterceptorOptions {
  skip?: (options?: RequestContext) => boolean;
}
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(
    private logger: NestjsWinstonLoggerService,
    private options?: WinstonLoggingInterceptorOptions,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const requestContext = composeContext(context);
    this.logger.setContext(requestContext.serviceName);
    const contextType: string = context.getType();

    switch (contextType) {
      case ExecutionContextType.HTTP: {
        // do something that is only important in the context of regular HTTP requests (REST)
        const shouldSkip = this.options?.skip?.(requestContext);
        if (shouldSkip) break;

        const { request } = requestContext;

        this.logger.log(
          `${JSON.stringify(
            {
              headers: request.headers,
              type: LOG_TYPE.REQUEST_ARGS,
              // if body is multipart, request.body={}
              value: request.body,
            },
            getCircularReplacer(),
          )}`,
        );
        break;
      }
      case ExecutionContextType.GRAPHQL: {
        const shouldSkip = this.options?.skip?.(requestContext);
        if (shouldSkip) break;

        const { request, args } = requestContext;

        this.logger.log(
          `${JSON.stringify(
            {
              headers: request?.headers,
              type: LOG_TYPE.REQUEST_ARGS,
              value: args,
            },
            getCircularReplacer(),
          )}`,
        );
        break;
      }
      case ExecutionContextType.RPC: {
        // do something that is only important in the context of Microservice requests
        break;
      }
    }

    // const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (value) => {
          const shouldSkip = this.options?.skip?.(requestContext);
          if (shouldSkip) return;

          this.logger.log(
            `${JSON.stringify({ Response: value }, getCircularReplacer())}`,
          );
        },
        /*
       /**
         * Intercept error state
         */
        // error: (err) => {
        //   this.logger.error(err, "");
        // },

        /**
         * Intercept complete state
         */
        // complete: () => this.logger.log(`Finished... ${Date.now() - now}ms`),
      }),
    );
  }
}
