export declare type ScopedFunction = Function & {
    scope?: Record<string, any>;
};
export declare type FunctionProxy = ProxyHandler<ScopedFunction>;
export declare function createFunctionProxy(fn: ScopedFunction, scope: Record<string, any>): FunctionProxy;
