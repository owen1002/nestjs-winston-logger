"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggerContexts = exports.InjectLogger = exports.getLoggerToken = void 0;
const common_1 = require("@nestjs/common");
const nestjs_winston_logger_service_1 = require("./nestjs-winston-logger.service");
const loggerContexts = new Set();
function getLoggerToken(context) {
    return `${nestjs_winston_logger_service_1.NestjsWinstonLoggerService.name}:${context}`;
}
exports.getLoggerToken = getLoggerToken;
function InjectLogger(context = "") {
    loggerContexts.add(context);
    return common_1.Inject(getLoggerToken(context));
}
exports.InjectLogger = InjectLogger;
function getLoggerContexts() {
    return [...loggerContexts.values()];
}
exports.getLoggerContexts = getLoggerContexts;
//# sourceMappingURL=nestjs-winston-logger.decorator.js.map