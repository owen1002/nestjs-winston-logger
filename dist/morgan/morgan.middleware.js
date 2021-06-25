"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganResponseLogger = exports.morganRequestLogger = void 0;
const morgan = require("morgan");
const morgan_constants_1 = require("./morgan.constants");
const morganRequestLogger = (logger, morganFormatString = morgan_constants_1.MORGAN_FORMAT_STRING.REQUEST) => morgan(morganFormatString, {
    immediate: true,
    stream: {
        write: (message) => {
            logger.log(message);
        },
    },
});
exports.morganRequestLogger = morganRequestLogger;
const morganResponseLogger = (logger, morganFormatString = morgan_constants_1.MORGAN_FORMAT_STRING.RESPONSE) => morgan(morganFormatString, {
    stream: {
        write: (message) => {
            logger.log(message);
        },
    },
});
exports.morganResponseLogger = morganResponseLogger;
//# sourceMappingURL=morgan.middleware.js.map