## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn add nestjs-winston-logger
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
import { NestjsWinstonLoggerService } from "nestjs-winston-logger";

@Injectable()
export class DemoService {
  constructor(private logger: NestjsWinstonLoggerService) {
    logger.setContext(DemoService.name);
  }
}
```

## License

Nest is [MIT licensed](LICENSE).
