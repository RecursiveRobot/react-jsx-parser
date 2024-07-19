import { createFunctionProxy } from './functionProxy'

jest.unmock('./functionProxy')

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
})
