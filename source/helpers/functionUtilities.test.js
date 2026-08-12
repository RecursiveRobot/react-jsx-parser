import * as Acorn from 'acorn'
import * as AcornJSX from 'acorn-jsx'
import { getAllJsxElements, getClosureBindings, constructFunction, getRenderFunction, transpileFunctionBody } from './functionUtilities'

describe('transpileFunctionBody', () => {
	it('replaces JSX at its offsets, not at an earlier matching string literal', () => {
		const body = "{ const s = '<b>x</b>';\n\treturn <b>x</b>; }"
		const [transpiled] = transpileFunctionBody(body, () => null)

		// The string literal is untouched; only the actual JSX became a render call.
		expect(transpiled).toContain("const s = '<b>x</b>'")
		expect(transpiled).toMatch(/return __jsxRenderContext__\.renderJSXElementWrapper_0\(/)
		expect(transpiled.match(/renderJSXElementWrapper_0/g)).toHaveLength(1)
		expect(transpiled).not.toContain('return <b>x</b>')
	})
	it('replaces duplicate identical elements each at their own position, in source order', () => {
		const body = '{ const a = <b>x</b>; const c = <b>x</b>; return <div></div>; }'
		const [transpiled, renderFunctions] = transpileFunctionBody(body, () => null)

		expect(transpiled).toMatch(/const a = __jsxRenderContext__\.renderJSXElementWrapper_0\(/)
		expect(transpiled).toMatch(/const c = __jsxRenderContext__\.renderJSXElementWrapper_1\(/)
		expect(transpiled).toMatch(/return __jsxRenderContext__\.renderJSXElementWrapper_2\(/)
		expect(Object.keys(renderFunctions)).toHaveLength(3)
	})
	it('preserves the body line count (plus the injected preamble line)', () => {
		const body = '{\n\treturn <div>\n\t\t<span>hi</span>\n\t</div>;\n}'
		const [transpiled] = transpileFunctionBody(body, () => null)

		// The multi-line element collapses onto one line but is newline-padded back; the only
		// added line is the render-context preamble (absorbed by `constructFunction`'s offset math).
		expect(transpiled.split('\n')).toHaveLength(body.split('\n').length + 1)
	})
})

describe('getRenderFunction', () => {
	it('reads bindings from its call-time `this` rather than freezing them', () => {
		const scopes = []
		const parseExpression = (jsx, expression, scope) => {
			scopes.push(scope)
			return scope.foo
		}
		const render = getRenderFunction('<span>{foo}</span>', parseExpression)
		const context = { foo: 1, render }

		expect(context.render({ bar: 2 })).toEqual(1)
		expect(scopes[0]).toMatchObject({ foo: 1, bar: 2 })

		// Mutating the context after creation is visible on the next call — live, not frozen...
		context.foo = 42
		expect(context.render({})).toEqual(42)
	})
	it('lets call args shadow context bindings', () => {
		const parseExpression = (jsx, expression, scope) => scope.foo
		const render = getRenderFunction('<span>{foo}</span>', parseExpression)
		const context = { foo: 1, render }

		expect(context.render({ foo: 99 })).toEqual(99)
	})
})

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

	describe('constructFunction', () => {
		it('should handle parameterless functions', () => {
			const body = 'const foo = 42;\nreturn foo;'
			const func = constructFunction([], body)
			const result = func()
			expect(result).toEqual(42)
		})
		it('should handle parameterized functions', () => {
			const body = 'const foo = 42;\nreturn foo + bar + baz;'
			const func = constructFunction(['bar', 'baz'], body)
			const result = func(1, 2)
			expect(result).toEqual(45)
		})
		it('should have access to provided scope', () => {
			const body = 'const foo = 42;\nreturn foo + this.bar + this.baz;'
			const func = constructFunction([], body)
			const result = func.apply({ bar: 1, baz: 2 })
			expect(result).toEqual(45)
		})
		it('should have access to provided scope - nested', () => {
			const body = 'const foo = 42;\nreturn foo + this.foobar.bar + this.foobar.baz;'
			const func = constructFunction([], body)
			const result = func.call({ foobar: { bar: 1, baz: 2 } })
			expect(result).toEqual(45)
		})
		it('produces a user-friendly error message - full surrounding scope available', () => {
			const body = 'const line_one = 1;\nconst line_two = 2;\nthrow new Error("This line should be highlighted.");\nconst line_four = 4;\nconst line_five = 5;\nconst line_six = 6;'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `3`:/)
				expect(error.message).toMatch(/    1: const line_one = 1;/)
				expect(error.message).toMatch(/    2: const line_two = 2;/)
				expect(error.message).toMatch(/>>> 3: throw new Error\("This line should be highlighted."\);/)
				expect(error.message).toMatch(/    4: const line_four = 4;/)
				expect(error.message).toMatch(/    5: const line_five = 5;/)
				expect(error.stack).not.toMatch(/\{/)
				expect(error.stack).not.toMatch(/\}/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('produces a user-friendly error message - some surrounding scope available', () => {
			const body = 'const line_one = 1;\nthrow new Error("This line should be highlighted.");\nconst line_three = 3;'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `2`:/)
				expect(error.message).toMatch(/    1: const line_one = 1;/)
				expect(error.message).toMatch(/>>> 2: throw new Error\("This line should be highlighted."\);/)
				expect(error.message).toMatch(/    3: const line_three = 3;/)
				expect(error.stack).not.toMatch(/\{/)
				expect(error.stack).not.toMatch(/\}/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('produces a user-friendly error message - no surrounding scope available', () => {
			const body = 'throw new Error("This line should be highlighted.");'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `1`:/)
				expect(error.message).toMatch(/>>> 1: throw new Error\("This line should be highlighted."\);/)
				expect(error.stack).not.toMatch(/\{/)
				expect(error.stack).not.toMatch(/\}/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('includes the provided function name in the error message', () => {
			const body = 'throw new Error("This line should be highlighted.");'
			const func = constructFunction(['bar', 'baz'], body, 'foo')
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `foo` at line `1`:/)
				expect(error.message).toMatch(/>>> 1: throw new Error\("This line should be highlighted."\);/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('excludes leading and trailing whitespace from the source code fragment', () => {
			const body = '\n\n\n\n\n\nconst line_one = 1;\nconst line_two = 2;\nthrow new Error("This line should be highlighted.");\nconst line_four = 4;\nconst line_five = 5;\n\n\n'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `3`:/)
				expect(error.message).toMatch(/    1: const line_one = 1;/)
				expect(error.message).toMatch(/    2: const line_two = 2;/)
				expect(error.message).toMatch(/>>> 3: throw new Error\("This line should be highlighted."\);/)
				expect(error.message).toMatch(/    4: const line_four = 4;/)
				expect(error.message).toMatch(/    5: const line_five = 5;/)
				expect(error.stack).not.toMatch(/\{/)
				expect(error.stack).not.toMatch(/\}/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('trims excess leading whitespace from the source code lines - 1', () => {
			const body = '\n\n\n\n\n\n    const line_one = 1;\n    const line_two = 2;\n    throw new Error("This line should be highlighted.");\n    const line_four = 4;\n    const line_five = 5;\n\n\n   \n'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `3`:/)
				expect(error.message).toMatch(/    1: const line_one = 1;/)
				expect(error.message).toMatch(/    2: const line_two = 2;/)
				expect(error.message).toMatch(/>>> 3: throw new Error\("This line should be highlighted."\);/)
				expect(error.message).toMatch(/    4: const line_four = 4;/)
				expect(error.message).toMatch(/    5: const line_five = 5;/)
				expect(error.stack).not.toMatch(/\{/)
				expect(error.stack).not.toMatch(/\}/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('trims excess leading whitespace from the source code lines - 2', () => {
			const body = '\n\n\n\n\n\n    const line_one = 1;\n    if (true) {\n        throw new Error("This line should be highlighted.");\n    }\n    const line_five = 5;\n\n\n   \n'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `3`:/)
				expect(error.message).toMatch(/    1: const line_one = 1;/)
				expect(error.message).toMatch(/    2: if \(true\) \{/)
				expect(error.message).toMatch(/>>> 3:     throw new Error\("This line should be highlighted."\);/)
				expect(error.message).toMatch(/    4: \}/)
				expect(error.message).toMatch(/    5: const line_five = 5;/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('trims excess brackets from the function body', () => {
			const body = '{\n\n\n\n\n\n    const line_one = 1;\n    const line_two = 2;\n    throw new Error("This line should be highlighted.");\n    const line_four = 4;\n    const line_five = 5;\n\n\n   \n}'
			const func = constructFunction(['bar', 'baz'], body)
			try {
				func(1, 2)
			} catch (error) {
				/* eslint-disable no-regex-spaces */
				expect(error.message).toMatch(/Error occurred in dynamic function `anonymous` at line `3`:/)
				expect(error.message).toMatch(/    1: const line_one = 1;/)
				expect(error.message).toMatch(/    2: const line_two = 2;/)
				expect(error.message).toMatch(/>>> 3: throw new Error\("This line should be highlighted."\);/)
				expect(error.message).toMatch(/    4: const line_four = 4;/)
				expect(error.message).toMatch(/    5: const line_five = 5;/)
				expect(error.stack).not.toMatch(/\{/)
				expect(error.stack).not.toMatch(/\}/)
				/* eslint-enable no-regex-spaces */
			}
		})
		it('maps the offending line onto source offsets when a mapping is supplied', () => {
			expect.assertions(6)
			// The body sits at offset `prefix.length` within `sourceText`; the prefix contains a
			// newline so the *source* line (3) differs from the *body* line (2), proving the two
			// coordinate systems are independent.
			const prefix = 'AAA\nBBB'
			const body = 'const line_one = 1;\nthrow new Error("boom");\nconst line_three = 3;'
			const sourceText = `${prefix}${body}`
			const func = constructFunction([], body, 'fn', undefined, o => o + prefix.length, sourceText)
			try {
				func()
			} catch (error) {
				const { line, column, startOffset, endOffset } = error.sourceInfo.location
				// Offsets index the original source and round-trip against `sourceInfo.source`...
				expect(sourceText.slice(startOffset, endOffset)).toBe('throw new Error("boom");')
				expect(error.sourceInfo.source).toBe('throw new Error("boom");')
				expect(startOffset).toBe(prefix.length + 'const line_one = 1;\n'.length)
				// location is source-relative...
				expect(line).toBe(3)
				expect(column).toBe(0)
				// ...while the human snippet/message stays body-relative.
				expect(error.message).toMatch(/at line `2`:/)
			}
		})
		it('omits offsets and stays body-relative when no mapping is supplied', () => {
			expect.assertions(3)
			const body = 'const a = 1;\nthrow new Error("boom");\nconst c = 3;'
			const func = constructFunction([], body)
			try {
				func()
			} catch (error) {
				expect(error.sourceInfo.location).toEqual({ line: 2 })
				expect(error.sourceInfo.location.startOffset).toBeUndefined()
				expect(error.sourceInfo.source).toBe('throw new Error("boom");')
			}
		})
	})
})
