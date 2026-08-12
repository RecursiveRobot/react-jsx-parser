import { createFunctionProxy } from './functionProxy'

describe('functionProxy', () => {
	function sum() {
		return this.a + this.b
	}

	it('uses provided scope', () => {
		const proxy = createFunctionProxy(sum, { a: 1, b: 2 })
		const result = proxy()

		expect(result).toEqual(3)
	})
	it('allows for scope to be mutated', () => {
		const proxy = createFunctionProxy(sum, { a: 1, b: 2 })
		proxy.scope = { a: 3, b: 4 }
		const result = proxy()

		expect(result).toEqual(7)
	})
	it('respects bound function scope', () => {
		const proxy = createFunctionProxy(sum, { a: 1, b: 2 })
		const result = proxy.bind({ a: 7, b: 8 })()

		expect(result).toEqual(15)
	})
	it('respects applied function scope', () => {
		const proxy = createFunctionProxy(sum, { a: 1, b: 2 })
		const result = Reflect.apply(proxy, { a: 5, b: 6 }, [])

		expect(result).toEqual(11)
	})
	it('carries independent scopes across proxies of the same target', () => {
		const first = createFunctionProxy(sum, { a: 1, b: 2 })
		const second = createFunctionProxy(sum, { a: 10, b: 20 })

		expect(first()).toEqual(3)
		expect(second()).toEqual(30)
		// Mutating one proxy's scope must not leak into the other...
		second.scope = { a: 100, b: 200 }
		expect(first()).toEqual(3)
		expect(second()).toEqual(300)
	})
	it('exposes the current scope via the scope property', () => {
		const scope = { a: 1, b: 2 }
		const proxy = createFunctionProxy(sum, scope)

		expect(proxy.scope).toBe(scope)
		const next = { a: 3, b: 4 }
		proxy.scope = next
		expect(proxy.scope).toBe(next)
	})
})
