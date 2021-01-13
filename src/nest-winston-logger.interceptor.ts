import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { NestWinstonLoggerService } from "./nest-winston-logger.service";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: NestWinstonLoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.setContext(context.getClass().name);

    const now = Date.now();
    return next.handle().pipe(
      tap({
        next: (v) => {
          this.logger.log(`Response:${v}`);
        },
        /*
        If you want to append error handler
         error: (err) => {
           this.logger.error(err, "");
         },*/
        complete: () => this.logger.log(`Finished... ${Date.now() - now}ms`),
      }),
    );
  }
}
