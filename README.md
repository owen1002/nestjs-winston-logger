## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ yarn
```

## QuickStart

# To use it globally and log any response

```ts
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestWinstonLoggerService } from "nestjs-winston-logger";
import { LoggingInterceptor } from "nestjs-winston-logger";
import { format, transports } from "winston";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const globalLogger = new NestWinstonLoggerService({
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
  app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));
  const port = configService.get<string>("PORT");
  await app.listen(port).then(() => {
    console.log(`🚀 Server ready at ${port}`);
  });
}
bootstrap();
```

# To use it inside module

Inside demo.module.ts

```ts
import { Module } from "@nestjs/common";
import { LoggerModule } from "nestjs-winston-logger";
import { format, transports } from "winston";
import { DemoService } from "./demo.service";

@Module({
  imports: [
    LoggerModule.forRoot({
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
import { NestWinstonLoggerService } from "nestjs-winston-logger";

@Injectable()
export class DemoService {
  constructor(private logger: NestWinstonLoggerService) {
    logger.setContext(DemoService.name);
  }
}
```

## License

Nest is [MIT licensed](LICENSE).
