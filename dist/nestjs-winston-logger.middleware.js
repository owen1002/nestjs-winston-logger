"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendRequestIdToLogger = exports.appendIdToRequest = void 0;
const uuid_1 = require("uuid");
const appendIdToRequest = (req, res, next) => {
    const uuid = uuid_1.v4();
    req.headers.set("requestId", uuid);
    next();
};
exports.appendIdToRequest = appendIdToRequest;
const appendRequestIdToLogger = (logger) => (req, res, next) => {
    logger.appendDefaultMeta("request-id", req.headers["requestId"]);
    next();
};
exports.appendRequestIdToLogger = appendRequestIdToLogger;
//# sourceMappingURL=nestjs-winston-logger.middleware.js.map