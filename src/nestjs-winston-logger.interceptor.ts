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

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: NestjsWinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.setContext(context.getClass().name);

    const now = Date.now();

    if (context.getType() === "http") {
      // do something that is only important in the context of regular HTTP requests (REST)
      const ctx = context.switchToHttp();
      const request = ctx.getRequest<Request>();
      this.logger.log(
        `${JSON.stringify({
          type: LOG_TYPE.REQUEST_ARGS,
          value: request,
        })}`,
      );
    } else if (context.getType() === "rpc") {
      // do something that is only important in the context of Microservice requests
    } else if (context.getType<GqlContextType>() === "graphql") {
      const gqlContext = GqlExecutionContext.create(context);
      const args = gqlContext.getArgs();
      this.logger.log(
        `${JSON.stringify({ type: LOG_TYPE.REQUEST_ARGS, value: args })}`,
      );
    }
    
    return next.handle().pipe(
      tap({
        next: (v) => {
          this.logger.log(`Result: ${v}`);
        },
        /*
        If you want to append error handler
         error: (err) => {
           this.logger.error(err, "");
         },*/
        complete: () => this.logger.log(`Complete time: ${Date.now() - now}ms`),
      }),
    );
  }
}
