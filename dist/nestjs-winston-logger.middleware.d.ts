import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
export declare const appendRequestHeaderToLogger: (logger: NestjsWinstonLoggerService, label: string, value: string) => (req: Request, res: Response, next: NextFunction) => void;
