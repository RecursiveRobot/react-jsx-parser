import * as Acorn from 'acorn'
import * as AcornJSX from 'acorn-jsx'
import { getAllJsxElements, getClosureBindings } from './functionUtilities'

describe('getClosureBindings', () => {
	const parser = Acorn.Parser.extend(AcornJSX.default({
		autoCloseVoidElements: true,
	}))

	it('should handle simple attribute bindings', () => {
		const text = '<span foo={foo}></span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo'])
	})
	it('should handle simple JSX expressions', () => {
		const text = '<span>{foo}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo'])
	})
	it('should handle nested JSX expressions', () => {
		const text = '<span>{foo && <span>{bar}</span>}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar'])
	})
	it('should only return top-level members', () => {
		const text = '<span>{foo.bar}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo'])
	})
	it('should handle spread operators', () => {
		const text = '<span>{[...foo]}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo'])
	})
	it('should handle arrow functions', () => {
		const text = '<span onClick={(foo) => foo + bar + 42}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar'])
	})
	it('should disregard invocation context', () => {
		const text = '<span onClick={(foo) => this.bar(foo) + 42}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo'])
	})
	it('should handle template literals', () => {
		// eslint-disable-next-line no-template-curly-in-string
		const text = '<span>{`${foo} - ${bar}`}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar'])
	})
	it('should handle function calls', () => {
		const text = '<span>{foo(bar)}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar'])
	})
	it('should handle optional chaining', () => {
		const text = '<span>{foo?.bar}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo'])
	})
	it('should handle ternary expressions', () => {
		const text = '<span>{foo ? bar : baz}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar', 'baz'])
	})
	it('should handle fragments', () => {
		const text = '<><span>{foo}</span><span>{bar}</span></>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar'])
	})
	it('should handle constructor calls', () => {
		const text = '<span>{new Date(foo)}</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['Date', 'foo'])
	})
})

describe('getAllJsxElements', () => {
	it('should handle simple return values', () => {
		const text = '{ const foo = 42; return <span>{foo}</span>; }'
		const bindings = getAllJsxElements(text)
		expect(bindings).toHaveLength(1)
		expect(bindings[0].type).toEqual('JSXElement')
		expect(bindings[0].openingElement.name.name).toEqual('span')
	})
	it('should handle variable assignments', () => {
		const text = '{ const foo = <span>Bar</span>; return foo; }'
		const bindings = getAllJsxElements(text)
		expect(bindings).toHaveLength(1)
		expect(bindings[0].type).toEqual('JSXElement')
		expect(bindings[0].openingElement.name.name).toEqual('span')
	})
	it('should handle arrow functions', () => {
		const text = '{ const foo = () => <span>Bar</span>; return foo(); }'
		const bindings = getAllJsxElements(text)
		expect(bindings).toHaveLength(1)
		expect(bindings[0].type).toEqual('JSXElement')
		expect(bindings[0].openingElement.name.name).toEqual('span')
	})
	it('should handle object values', () => {
		const text = '{ const foo = { bar: <span>Bar</span> }; return foo; }'
		const bindings = getAllJsxElements(text)
		expect(bindings).toHaveLength(1)
		expect(bindings[0].type).toEqual('JSXElement')
		expect(bindings[0].openingElement.name.name).toEqual('span')
	})
	it('should handle array values', () => {
		const text = '{ const foo = [<span>Bar</span>]; return foo; }'
		const bindings = getAllJsxElements(text)
		expect(bindings).toHaveLength(1)
		expect(bindings[0].type).toEqual('JSXElement')
		expect(bindings[0].openingElement.name.name).toEqual('span')
	})
})
