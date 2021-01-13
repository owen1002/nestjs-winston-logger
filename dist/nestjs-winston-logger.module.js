"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var NestJsWinstonLoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestJsWinstonLoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nestjs_winston_logger_constants_1 = require("./nestjs-winston-logger.constants");
const nestjs_winston_logger_service_1 = require("./nestjs-winston-logger.service");
let NestJsWinstonLoggerModule = NestJsWinstonLoggerModule_1 = class NestJsWinstonLoggerModule {
    static forRoot(options) {
        return {
            module: NestJsWinstonLoggerModule_1,
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
NestJsWinstonLoggerModule = NestJsWinstonLoggerModule_1 = __decorate([
    common_1.Module({})
], NestJsWinstonLoggerModule);
exports.NestJsWinstonLoggerModule = NestJsWinstonLoggerModule;
//# sourceMappingURL=nestjs-winston-logger.module.js.map