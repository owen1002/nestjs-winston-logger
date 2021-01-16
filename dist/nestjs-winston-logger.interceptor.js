"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const nestjs_winston_logger_service_1 = require("./nestjs-winston-logger.service");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        this.logger.setContext(context.getClass().name);
        const now = Date.now();
        return next.handle().pipe(operators_1.tap({
            next: (v) => {
                this.logger.log(`Result: ${v}`);
            },
            complete: () => this.logger.log(`Complete time: ${Date.now() - now}ms`),
        }));
    }
};
LoggingInterceptor = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [nestjs_winston_logger_service_1.NestjsWinstonLoggerService])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=nestjs-winston-logger.interceptor.js.map