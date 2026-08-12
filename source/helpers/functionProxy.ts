// Workaround for functions not allowing multiple `.bind` calls.
// Store the current scope alongside the function and use that to augment the
// invocation scope when the function is called.
export type ScopedFunction = Function & {
	scope?: Record<string, any>,
}
export type FunctionProxy = ProxyHandler<ScopedFunction>

// Return a Proxy which invokes the wrapped function using the union of its
// current scope and the invocation scope as context.
// This allows for mutation of the scope after the function is created, as well
// as support for the standard `bind` and `apply` functionality.
//
// The scope lives in per-proxy state (NOT on the target): the same target
// function may back multiple proxies (it is cached per AST node — see
// `#functionCache` in JsxParser), each carrying an independent scope.  The
// `scope` get/set traps preserve the public `.scope` shape, and assigning
// `proxy.scope` re-targets subsequent invocations without changing identity.
export function createFunctionProxy(
	fn: ScopedFunction,
	scope: Record<string, any>,
): ScopedFunction {
	let currentScope = scope
	return new Proxy(fn, {
		apply: (target, thisArg, argArray) => Reflect.apply(
			target,
			{ ...currentScope, ...thisArg },
			argArray,
		),
		get: (target, prop, receiver) => (
			prop === 'scope' ? currentScope : Reflect.get(target, prop, receiver)
		),
		set: (target, prop, value, receiver) => {
			if (prop === 'scope') {
				currentScope = value
				return true
			}
			return Reflect.set(target, prop, value, receiver)
		},
	}) as ScopedFunction
}
