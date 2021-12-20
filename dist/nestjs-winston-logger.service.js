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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsWinstonLoggerService = void 0;
const common_1 = require("@nestjs/common");
const winston_1 = require("winston");
const nestjs_winston_logger_constants_1 = require("./nestjs-winston-logger.constants");
let NestjsWinstonLoggerService = class NestjsWinstonLoggerService extends common_1.Logger {
    constructor(config) {
        super();
        this.logger = (0, winston_1.createLogger)(config);
    }
    setContext(serviceName) {
        this.logger.defaultMeta = Object.assign(Object.assign({}, this.logger.defaultMeta), { service: serviceName });
    }
    appendDefaultMeta(key, value) {
        this.logger.defaultMeta = Object.assign(Object.assign({}, this.logger.defaultMeta), { [key]: value });
    }
    log(message) {
        this.logger.info(message);
    }
    error(message, trace) {
        this.logger.error(message, trace);
    }
    warn(message) {
        this.logger.warn(message);
    }
    debug(message) {
        this.logger.debug(message);
    }
    verbose(message) {
        this.logger.verbose(message);
    }
};
NestjsWinstonLoggerService = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Inject)(nestjs_winston_logger_constants_1.NESTJS_WINSTON_CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], NestjsWinstonLoggerService);
exports.NestjsWinstonLoggerService = NestjsWinstonLoggerService;
//# sourceMappingURL=nestjs-winston-logger.service.js.map