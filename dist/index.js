"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InjectLogger = void 0;
__exportStar(require("./nestjs-winston-logger.constants"), exports);
__exportStar(require("./nestjs-winston-logger.interceptor"), exports);
__exportStar(require("./nestjs-winston-logger.module"), exports);
__exportStar(require("./nestjs-winston-logger.service"), exports);
__exportStar(require("./nestjs-winston-logger.middleware"), exports);
__exportStar(require("./morgan"), exports);
var nestjs_winston_logger_decorator_1 = require("./nestjs-winston-logger.decorator");
Object.defineProperty(exports, "InjectLogger", { enumerable: true, get: function () { return nestjs_winston_logger_decorator_1.InjectLogger; } });
//# sourceMappingURL=index.js.map