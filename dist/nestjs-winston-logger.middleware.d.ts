/// <reference types="node" />
import { Response, NextFunction } from "express";
import { NestjsWinstonLoggerService } from "./nestjs-winston-logger.service";
import { IncomingMessage } from "http";
export interface CustomizedRequest extends IncomingMessage {
    reqId: string;
}
export declare const appendIdToRequest: (req: Request, res: Response, next: NextFunction) => void;
export declare const appendRequestIdToLogger: (logger: NestjsWinstonLoggerService) => (req: CustomizedRequest, res: Response, next: NextFunction) => void;
