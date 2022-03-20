import { ExecutionContext } from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { GqlExecutionContext } from "@nestjs/graphql";

export enum ExecutionContextType {
  HTTP = "http",
  GRAPHQL = "graphql",
  RPC = "rpc",
}

export interface RequestContext {
  serviceName: string;
  rawContext: ExecutionContext;
  type: string;
  httpContext: HttpArgumentsHost;
  context?: Record<string, any>;
  request?: Request;
  args?: any;
}

export const composeContext = (
  rawContext: ExecutionContext,
): RequestContext => {
  const serviceName = rawContext.getClass().name;
  const type: string = rawContext.getType();
  const httpContext = rawContext.switchToHttp();
  const baseContext = {
    serviceName,
    rawContext,
    httpContext,
    type,
  };

  switch (type) {
    case ExecutionContextType.HTTP: {
      const request = httpContext.getRequest();

      return {
        ...baseContext,
        request,
      };
    }
    case ExecutionContextType.GRAPHQL: {
      const context = GqlExecutionContext.create(rawContext);
      const request = httpContext.getRequest();
      const args = context.getArgs();

      return {
        ...baseContext,
        request,
        context,
        args,
      };
    }
    default: {
      return baseContext;
    }
  }
};
