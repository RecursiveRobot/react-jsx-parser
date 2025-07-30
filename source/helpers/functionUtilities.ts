import * as Acorn from 'acorn'
import * as AcornJSX from 'acorn-jsx'

export function isSpreadElement(node: AcornJSX.BaseExpression): node is AcornJSX.SpreadElement {
	return (node as AcornJSX.SpreadElement).type === 'SpreadElement'
}

/// Returns an array of all the scoped bindings which the given expression closes over.
/// This includes all the identifiers, member expressions, function calls, and function parameters.
///
/// This is used to determine which arguments should be passed through to the render function
/// for the given JSX.
export function getClosureBindings(fullExpression: AcornJSX.Expression): string[] {
	const result = new Set<string>()
	const processExpression = (expression: AcornJSX.Expression): void => {
		switch (expression.type) {
		// foo ==> ['foo']
		case 'Identifier':
			result.add(expression.name)
			break
		// [foo, bar, baz] ==> ['foo', 'bar', 'baz']
		case 'ArrayExpression':
			(expression.elements || []).forEach(el => {
				if (isSpreadElement(el)) {
					processExpression(el.argument)
					return
				}
				processExpression(el)
			})
			break
		// (foo) => foo + bar + baz ==> ['foo', 'bar', 'baz']
		case 'ArrowFunctionExpression':
			expression.params.forEach(param => {
				if (param.type === 'Identifier' || param.type === 'MemberExpression') {
					processExpression(param)
				}
			})
			processExpression(expression.body)
			break
		// a || b ==> ['a', 'b']
		case 'BinaryExpression':
			processExpression(expression.left)
			processExpression(expression.right)
			break
		// foo(bar, baz) ==> ['foo', 'bar', 'baz']
		case 'CallExpression':
			processExpression(expression.callee);
			(expression.arguments || []).forEach(arg => processExpression(arg))
			break
		// foo?.bar?.baz ==> ['foo']
		case 'ChainExpression':
			processExpression(expression.expression)
			break
		// foo ? bar : baz ==> ['foo', 'bar', 'baz']
		case 'ConditionalExpression':
			processExpression(expression.test)
			processExpression(expression.consequent)
			processExpression(expression.alternate)
			break
		// {foo} ==> ['foo']
		case 'ExpressionStatement':
			processExpression(expression.expression)
			break
		// <span className={foo}>{bar} - {baz}</span> => ['foo', 'bar', 'baz']
		case 'JSXElement':
			(expression.openingElement.attributes || []).forEach(attr => {
				if (attr.type === 'JSXAttribute') {
					processExpression(attr.value)
				}
			});
			(expression.children || []).forEach(child => {
				processExpression(child)
			})
			break
		// <><span>{foo}</span><span>{bar}</span></> ==> ['foo', 'bar']
		case 'JSXFragment':
			(expression.children || []).forEach(child => processExpression(child))
			break
		// {foo} ==> ['foo']
		case 'JSXExpressionContainer':
			processExpression(expression.expression)
			break
		// foo && bar ==> ['foo', 'bar']
		case 'LogicalExpression':
			processExpression(expression.left)
			processExpression(expression.right)
			break
		// foo.bar ==> ['foo']
		case 'MemberExpression':
			processExpression(expression.object)
			break
		// new foo(bar) ==> ['foo', 'bar']
		case 'NewExpression':
			processExpression(expression.callee);
			(expression.arguments || []).forEach(arg => processExpression(arg))
			break
		// { ...foo, bar, b: baz } ==> ['foo', 'bar', 'baz']
		case 'ObjectExpression':
			(expression.properties || []).forEach(prop => {
				if (isSpreadElement(prop)) {
					processExpression(prop.argument)
					return
				}
				processExpression(prop.value)
			})
			break
		// `${foo} - ${bar}` ==> ['foo', 'bar']
		case 'TemplateLiteral':
			(expression.expressions || []).forEach(el => {
				processExpression(el)
			})
			break
		}
	}
	processExpression(fullExpression)

	return Array.from(result.values())
}

/// Returns a function which can be used to render the given JSX.
/// The JSX is parsed once-off and the resulting function can be called
/// multiple times (with different bindings, if necessary).
export function getRenderFunction(
	jsx: string,
	bindings: Record<string, any>,
	parseExpression: (exp: AcornJSX.Expression, scope?: Record<string, any>) => any,
): (args: Record<string, any>) => any {
	const parser = Acorn.Parser.extend(AcornJSX.default({
		autoCloseVoidElements: true,
	}))
	const expression = parser.parse(jsx, { ecmaVersion: 'latest' }) as any
	return (args: Record<string, any>) => parseExpression(
		expression.body[0],
		{ ...bindings, ...args },
	)
}

/// Returns an array of all JSX elements within the given code block.
/// Each of these elements will later be transpiled into a render function call.
export function getAllJsxElements(code: string): (AcornJSX.JSXElement | AcornJSX.JSXFragment)[] {
	const parser = Acorn.Parser.extend(AcornJSX.default({
		autoCloseVoidElements: true,
	}))

	// Only valid function declarations can be parsed, so we wrap the code
	// (which already includes the curly braces) in a dummy function declaration...
	const prefix = 'function dummy() '
	const parsedFunction = parser.parse(`${prefix}${code}`, { ecmaVersion: 'latest' })

	const result: AcornJSX.JSXElement[] = []
	const processExpression = (expression: Acorn.Node): void => {
		switch (expression.type) {
		// Top-level JSX Elements and Fragments are added to the collection...
		case 'JSXElement':
		case 'JSXFragment':
			result.push({
				...expression,
				// Remove our dummy prefix from the calculated start and end positions
				start: expression.start - prefix.length,
				end: expression.end - prefix.length,
			} as AcornJSX.JSXElement)
			break
		// All other expressions (and their children/properties) are recursively traversed...
		default:
			Object.values(expression).forEach(field => {
				if (field && typeof field === 'object') {
					processExpression(field)
				}
			})
		}
	}
	processExpression(parsedFunction)

	return result
}

/// Transpiles the given (vanilla JS) function body to handle JSX rendering.
/// This is done by replacing each JSX element expression with an appropriate render function call.
export function transpileFunctionBody(
	body: string,
	bindings: Record<string, any>,
	parseExpression: (exp: AcornJSX.Expression, scope?: Record<string, any>) => any,
): [string, Record<string, any>] {
	const renderFunctions: Record<string, any> = {}
	const replacements: [string, string][] = []

	// For each JSX element, calculate the replacement string and render function...
	const jsxElements = getAllJsxElements(body)
	jsxElements.forEach((element, index) => {
		const renderFunctionName = `renderJSXElementWrapper_${index}`
		const renderFunction = getRenderFunction(
			body.slice(element.start, element.end),
			bindings,
			parseExpression,
		)
		renderFunctions[renderFunctionName] = renderFunction
		replacements.push([
			`${body.slice(element.start, element.end)}`,
			`__jsxRenderContext__.${renderFunctionName}({ ${getClosureBindings(element).join(', ')} })`,
		])
	})

	if (!replacements.length) return [body, {}]

	// Prepend the render function context to the body...
	let newBody = `{ const __jsxRenderContext__ = this;\r\n${body.slice(1)}`
	// Replace the JSX expressions with their render function calls...
	replacements.forEach(([expression, renderCall]) => {
		newBody = newBody.replace(expression, renderCall)
	})
	return [newBody, renderFunctions]
}
