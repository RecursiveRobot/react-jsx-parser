// Workaround for functions not allowing multiple `.bind` calls.
// Store the current scope as a field alongside the function and use that
// to augment the invocation scope when the function is called.
export type ScopedFunction = Function & {
	scope?: Record<string, any>,
}
export type FunctionProxy = ProxyHandler<ScopedFunction>

// Return a Proxy which invokes the wrapped function using the union of its
// current scope and the invocation scope as context.
// This allows for mutation of the scope after the function is created, as well
// as support for the standard `bind` and `apply` functionality.
export function createFunctionProxy(
	fn: ScopedFunction,
	scope: Record<string, any>,
): FunctionProxy {
	const scopedFunction = fn
	scopedFunction.scope = scope
	return new Proxy(scopedFunction, {
		apply: (target, thisArg, argArray) => Reflect.apply(
			target,
			{ ...target.scope, ...thisArg },
			argArray,
		),
	}) as FunctionProxy
}
