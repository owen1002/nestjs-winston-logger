export declare function getLoggerToken(context: string): string;
export declare function InjectLogger(context?: string): (target: object, key: string | symbol, index?: number) => void;
export declare function getLoggerContexts(): string[];
