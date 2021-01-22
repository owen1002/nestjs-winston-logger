"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appendRequestHeaderToLogger = void 0;
const appendRequestHeaderToLogger = (logger, label, value) => (req, res, next) => {
    logger.appendDefaultMeta(label, value);
    next();
};
exports.appendRequestHeaderToLogger = appendRequestHeaderToLogger;
//# sourceMappingURL=nestjs-winston-logger.middleware.js.map