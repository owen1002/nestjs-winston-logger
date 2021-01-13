"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestjsWinstonLoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestjsWinstonLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_winston_logger_constants_1 = require("./nestjs-winston-logger.constants");
const nestjs_winston_logger_service_1 = require("./nestjs-winston-logger.service");
let NestjsWinstonLoggerModule = NestjsWinstonLoggerModule_1 = class NestjsWinstonLoggerModule {
    static forRoot(options) {
        return {
            module: NestjsWinstonLoggerModule_1,
            providers: [
                {
                    provide: nestjs_winston_logger_constants_1.NESTJS_WINSTON_CONFIG_OPTIONS,
                    useValue: options,
                },
                nestjs_winston_logger_service_1.NestjsWinstonLoggerService,
            ],
            exports: [nestjs_winston_logger_service_1.NestjsWinstonLoggerService],
        };
    }
};
NestjsWinstonLoggerModule = NestjsWinstonLoggerModule_1 = __decorate([
    common_1.Module({})
], NestjsWinstonLoggerModule);
exports.NestjsWinstonLoggerModule = NestjsWinstonLoggerModule;
//# sourceMappingURL=nestjs-winston-logger.module.js.map