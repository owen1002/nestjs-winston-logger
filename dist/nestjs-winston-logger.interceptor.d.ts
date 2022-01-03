import { NestInterceptor, ExecutionContext, CallHandler } from "@nestjs/common";
import { Observable } from "rxjs";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
export declare class LoggingInterceptor implements NestInterceptor {
    private logger;
    constructor(logger: NestjsWinstonLoggerService);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
