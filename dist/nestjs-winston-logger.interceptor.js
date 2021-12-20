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
const graphql_1 = require("@nestjs/graphql");
const operators_1 = require("rxjs/operators");
const nestjs_winston_logger_constants_1 = require("./nestjs-winston-logger.constants");
const nestjs_winston_logger_service_1 = require("./nestjs-winston-logger.service");
const utils_1 = require("./utils");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        var _a;
        this.logger.setContext(context.getClass().name);
        const ctx = context.switchToHttp();
        if (context.getType() === "http") {
            const request = ctx.getRequest();
            this.logger.log(`${JSON.stringify({
                headers: request.headers,
                type: nestjs_winston_logger_constants_1.LOG_TYPE.REQUEST_ARGS,
                value: request.body,
            }, (0, utils_1.getCircularReplacer)())}`);
        }
        else if (context.getType() === "rpc") {
        }
        else if (context.getType() === "graphql") {
            const gqlContext = graphql_1.GqlExecutionContext.create(context);
            const args = gqlContext.getArgs();
            this.logger.log(`${JSON.stringify({
                headers: (_a = ctx.getRequest()) === null || _a === void 0 ? void 0 : _a.headers,
                type: nestjs_winston_logger_constants_1.LOG_TYPE.REQUEST_ARGS,
                value: args,
            }, (0, utils_1.getCircularReplacer)())}`);
        }
        return next.handle().pipe((0, operators_1.tap)({
            next: (value) => {
                this.logger.log(`${JSON.stringify({ Response: value }, (0, utils_1.getCircularReplacer)())}`);
            },
        }));
    }
};
LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [nestjs_winston_logger_service_1.NestjsWinstonLoggerService])
], LoggingInterceptor);
exports.LoggingInterceptor = LoggingInterceptor;
//# sourceMappingURL=nestjs-winston-logger.interceptor.js.map