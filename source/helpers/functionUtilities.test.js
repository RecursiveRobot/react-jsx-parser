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
	it('should handle name-only attribute bindings', () => {
		const text = '<Tooltip arrow disableInteractive title={foo}><span>Foo</span></Tooltip>'
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
	it('should include arrow function members', () => {
		const text = '<span onClick={() => foo + bar + 42}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['foo', 'bar'])
	})
	it('should exclude arrow function arguments', () => {
		const text = '<span onClick={(foo, baz) => foo + bar + baz + 42}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['bar'])
	})
	it('should exclude arrow function object pattern arguments', () => {
		const text = '<span onClick={({ foo, baz }) => foo + bar + baz + 42}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['bar'])
	})
	it('should exclude arrow function array pattern arguments', () => {
		const text = '<span onClick={([foo]) => foo + bar + 42}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['bar'])
	})
	it('should correctly scope arrow function argument exclusions', () => {
		const text = '<><span onClick={({ foo }) => foo + bar + 42}>Blah</span><span>{foo}</span></>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['bar', 'foo'])
	})
	it('should correctly scope nested arrow function argument exclusions', () => {
		const text = '<span onClick={({ foo }) => foo + bar + ((baz) => foo + baz + qux)(42)}>Blah</span>'
		const expression = parser.parse(text, { ecmaVersion: 'latest' })
		const bindings = getClosureBindings(expression.body[0])
		expect(bindings).toEqual(['bar', 'qux'])
	})
	it('should disregard invocation context', () => {
		const text = '<span onClick={() => this.bar(foo) + 42}>Blah</span>'
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
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(1)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
	})
	it('should handle variable assignments', () => {
		const text = '{ const foo = <span>Foo</span>; return foo; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(1)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
	})
	it('should handle variable assignments - multiple', () => {
		const text = '{ const foo = <span>Foo</span>; const bar = <div>Bar</div>; return [foo, bar]; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(2)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
		expect(elements[1].type).toEqual('JSXElement')
		expect(elements[1].openingElement.name.name).toEqual('div')
	})
	it('should handle arrow functions', () => {
		const text = '{ const foo = () => <span>Bar</span>; return foo(); }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(1)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
	})
	it('should handle arrow functions - multiple', () => {
		const text = '{ const foo = () => <span>Bar</span>; const bar = () => <div>Bar</div>; return [foo(), bar()]; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(2)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
		expect(elements[1].type).toEqual('JSXElement')
		expect(elements[1].openingElement.name.name).toEqual('div')
	})
	it('should handle object values', () => {
		const text = '{ const foo = { bar: <span>Bar</span> }; return foo; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(1)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
	})
	it('should handle object values - multiple', () => {
		const text = '{ const foo = { bar: <span>Bar</span>, baz: <div>Baz</div> }; return foo; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(2)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
		expect(elements[1].type).toEqual('JSXElement')
		expect(elements[1].openingElement.name.name).toEqual('div')
	})
	it('should handle array values', () => {
		const text = '{ const foo = [<span>Bar</span>]; return foo; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(1)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
	})
	it('should handle array values - multiple', () => {
		const text = '{ const foo = [<span>Bar</span>, <div>Baz</div>]; return foo; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(2)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('span')
		expect(elements[1].type).toEqual('JSXElement')
		expect(elements[1].openingElement.name.name).toEqual('div')
	})
	it('should only include top-level JSX elements', () => {
		const text = '{ return <div>{ items.map(item => <span>{item.name}</span>) }</div>; }'
		const elements = getAllJsxElements(text)
		expect(elements).toHaveLength(1)
		expect(elements[0].type).toEqual('JSXElement')
		expect(elements[0].openingElement.name.name).toEqual('div')
	})
})
