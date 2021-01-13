import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { NestWinstonLoggerService } from "./nest-winston-logger.service";
export declare class LoggingInterceptor implements NestInterceptor {
    private logger;
    constructor(logger: NestWinstonLoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
