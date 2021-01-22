import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
export declare const appendRequestIdToLogger: (logger: NestjsWinstonLoggerService, label: string, value: string) => (req: Request, res: Response, next: NextFunction) => void;
