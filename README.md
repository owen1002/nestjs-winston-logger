## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation
yarn users
```bash
$ yarn add nestjs-winston-logger
```

npm users
```bash
$ npm install --save nestjs-winston-logger
```

## QuickStart

### To use it globally and log any response

```ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import {
  NestjsWinstonLoggerService,
  appendRequestIdToLogger,
  LoggingInterceptor,
  configMorgan,
  morganRequestLogger,
  morganResponseLogger,
  appendIdToRequest
} from "nestjs-winston-logger";

import { format, transports } from "winston";
import * as helmet from "helmet";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());

  const globalLogger = new NestjsWinstonLoggerService({
    format: format.combine(
      format.timestamp({ format: "isoDateTime" }),
      format.json(),
      format.colorize({ all: true }),
    ),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" }),
      new transports.Console(),
    ],
  });
  app.useLogger(globalLogger);

  // append id to identify request
  app.use(appendIdToRequest);
  app.use(appendRequestIdToLogger(globalLogger));

  configMorgan.appendMorganToken("reqId", TOKEN_TYPE.Request, "reqId");
  app.use(morganRequestLogger(globalLogger));
  app.use(morganResponseLogger(globalLogger));

  app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));

  const port = process.env.PORT || 4000;
  await app.listen(port).then(() => {
    console.log(`🚀 Server ready at ${port}`);
  });
}
bootstrap();
```

### To use it inside module

Inside demo.module.ts

```ts
import { Module } from "@nestjs/common";
import { NestjsWinstonLoggerModule } from "nestjs-winston-logger";
import { format, transports } from "winston";
import { DemoService } from "./demo.service";

@Module({
  imports: [
    NestjsWinstonLoggerModule.forRoot({
      format: format.combine(
        format.timestamp({ format: "isoDateTime" }),
        format.json(),
        format.colorize({ all: true }),
      ),
      transports: [
        new transports.File({ filename: "error.log", level: "error" }),
        new transports.File({ filename: "combined.log" }),
        new transports.Console(),
      ],
    }),
  ],
  providers: [DemoService],
})
export class DemoModule {}
```

Inside demo.service.ts

```ts
import { Injectable } from "@nestjs/common";
import { NestjsWinstonLoggerService, InjectLogger } from "nestjs-winston-logger";

@Injectable()
export class DemoService {
  constructor(@InjectLogger(DemoService.name) private logger: NestjsWinstonLoggerService) {}
}
```

### To use multiple loggers with different output config

Sometimes there is a need to have separate kinds information write to separate logs.  For example, we don't necessarily want authentication logging inside a debug log.  Instead, we have a separate authentication.log file just for recording sign in/out requests.

Inside demo.module.ts

```ts
import { Module } from "@nestjs/common";
import { NestjsWinstonLoggerModule } from "nestjs-winston-logger";
import { format, transports } from "winston";
import { DemoService } from "./demo.service";
import { AUTH_LOG } from "./demo.constants"

const defaultConfig = {
    format: format.combine(
      format.timestamp({ format: "isoDateTime" }),
      format.json(),
      format.colorize({ all: true }),
    ),
    transports: [
      new transports.File({ filename: "error.log", level: "error" }),
      new transports.File({ filename: "combined.log" }),
      new transports.Console(),
    ],
  };

let overrides:ContextOverrides = { };
overrides[AUTH_LOG] = {
    ...defaultConfig,
    transports: [
      new transports.File({ filename: "authentication.log" })
    ],
  };

@Module({
  imports: [
    NestjsWinstonLoggerModule.forRoot(defaultConfig, overrides),
  ],
  providers: [DemoService],
})
export class DemoModule {}
```

Inside login.service.ts

```ts
import { Injectable } from "@nestjs/common";
import { NestjsWinstonLoggerService, InjectLogger } from "nestjs-winston-logger";
import { AUTH_LOG } from "./demo.constants"

@Injectable()
export class LoginService {
  constructor(
    @InjectLogger(LoginService.name) private logger: NestjsWinstonLoggerService,
    @InjectLogger(AUTH_LOG, { service: LoginService.name}) private authLogger: NestjsWinstonLoggerService) { }
}
```

## Why not just use nest-winston?

[nest-winston](https://www.npmjs.com/package/nest-winston) is a populate package for providing basic integration between nest and winston.  However, many applications need more than just basic global logging.  nestjs-winston-logger provides fills in the following gaps from nest-winston by providing the following:

* multiple logs with different configuration
* request id metadata for each log message

## License

Nest is [MIT licensed](LICENSE).
