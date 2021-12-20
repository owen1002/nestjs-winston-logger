"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendRequestIdToLogger = exports.appendIdToRequest = void 0;
const uuid_1 = require("uuid");
const appendIdToRequest = (req, res, next) => {
    if (!req.headers["request-id"]) {
        const uuid = (0, uuid_1.v4)();
        req.headers["request-id"] = uuid;
    }
    next();
};
exports.appendIdToRequest = appendIdToRequest;
const appendRequestIdToLogger = (logger) => (req, res, next) => {
    logger.appendDefaultMeta("request-id", req.headers["request-id"]);
    next();
};
exports.appendRequestIdToLogger = appendRequestIdToLogger;
//# sourceMappingURL=nestjs-winston-logger.middleware.js.map