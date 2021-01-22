"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendRequestIdToLogger = void 0;
const appendRequestIdToLogger = (logger, label, value) => (req, res, next) => {
    logger.appendDefaultMeta("request-id", req["request-id"]);
    next();
};
exports.appendRequestIdToLogger = appendRequestIdToLogger;
//# sourceMappingURL=nestjs-winston-logger.middleware.js.map