"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LoggerModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const nest_winston_logger_constants_1 = require("./nest-winston-logger.constants");
const nest_winston_logger_service_1 = require("./nest-winston-logger.service");
let LoggerModule = LoggerModule_1 = class LoggerModule {
    static forRoot(options) {
        return {
            module: LoggerModule_1,
            providers: [
                {
                    provide: nest_winston_logger_constants_1.NEST_WINSTON_CONFIG_OPTIONS,
                    useValue: options,
                },
                nest_winston_logger_service_1.NestWinstonLoggerService,
            ],
            exports: [nest_winston_logger_service_1.NestWinstonLoggerService],
        };
    }
};
LoggerModule = LoggerModule_1 = __decorate([
    common_1.Module({})
], LoggerModule);
exports.LoggerModule = LoggerModule;
//# sourceMappingURL=nest-winston-logger.module.js.map