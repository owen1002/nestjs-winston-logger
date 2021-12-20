import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { NextFunction } from "express";
export declare const appendIdToRequest: (req: Request, res: Response, next: NextFunction) => void;
export declare const appendRequestIdToLogger: (logger: NestjsWinstonLoggerService) => (req: Request, res: Response, next: NextFunction) => void;
