import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { GqlContextType, GqlExecutionContext } from "@nestjs/graphql";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { LOG_TYPE } from "./nestjs-winston-logger.constants";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { Request } from "express";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: NestjsWinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.setContext(context.getClass().name);
    const ctx = context.switchToHttp();

    if (context.getType() === "http") {
      // do something that is only important in the context of regular HTTP requests (REST)
      // const ctx = context.switchToHttp();
      // const request = ctx.getRequest<Request>();
      // do something
    } else if (context.getType() === "rpc") {
      // do something that is only important in the context of Microservice requests
    } else if (context.getType<GqlContextType>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context);
      const args = gqlContext.getArgs();
      this.logger.log(
        `${JSON.stringify({
          headers: ctx.getRequest<Request>()?.headers,
          type: LOG_TYPE.REQUEST_ARGS,
          value: args,
        })}`,
      );
    }

    var replaceCircular = function (val, cache = null) {
      cache = cache || new WeakSet();

      if (val && typeof val == 'object') {
        if (cache.has(val)) return '[Circular]';

        cache.add(val);

        var obj = Array.isArray(val) ? [] : {};
        for (var idx in val) {
          obj[idx] = replaceCircular(val[idx], cache);
        }

        cache.delete(val);
        return obj;
      }

      return val;
    };

    // const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (value) => {
          this.logger.log(
            `${JSON.stringify(replaceCircular({ Response: value }))}`,
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
