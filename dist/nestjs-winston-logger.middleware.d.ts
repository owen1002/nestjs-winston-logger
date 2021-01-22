import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
export declare const appendIdToRequest: (req: Request, res: Response, next: NextFunction) => void;
export declare const appendRequestIdToLogger: (logger: NestjsWinstonLoggerService) => (req: Request, res: Response, next: NextFunction) => void;
