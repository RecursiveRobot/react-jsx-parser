/* eslint-disable linebreak-style */
/* global JSX */
import * as Acorn from 'acorn'
import * as AcornJSX from 'acorn-jsx'
import React, { Fragment, ComponentType, ExoticComponent } from 'react'
import ATTRIBUTES from '../constants/attributeNames'
import { canHaveChildren, canHaveWhitespace } from '../constants/specialTags'
import { randomHash } from '../helpers/hash'
import { parseStyle } from '../helpers/parseStyle'
import { resolvePath } from '../helpers/resolvePath'
import { createFunctionProxy } from '../helpers/functionProxy'

type ParsedJSX = JSX.Element | boolean | string
type ParsedTree = ParsedJSX | ParsedJSX[] | null
export type TProps = {
	allowUnknownElements?: boolean,
	autoCloseVoidElements?: boolean,
	bindings?: { [key: string]: unknown; },
	blacklistedAttrs?: Array<string | RegExp>,
	blacklistedTags?: string[],
	className?: string,
	components?: Record<string, ComponentType | ExoticComponent>,
	componentsOnly?: boolean,
	disableFragments?: boolean,
	disableKeyGeneration?: boolean,
	jsx?: string,
	onError?: (error: Error) => void,
	showWarnings?: boolean,
	renderError?: (props: { error: string }) => JSX.Element | null,
	renderInWrapper?: boolean,
	renderUnrecognized?: (tagName: string) => JSX.Element | null,
}
type Scope = Record<string, any>

function isSpreadElement(node: AcornJSX.BaseExpression): node is AcornJSX.SpreadElement {
	return (node as AcornJSX.SpreadElement).type === 'SpreadElement'
}

/* eslint-disable consistent-return */
export default class JsxParser extends React.Component<TProps> {
	static displayName = 'JsxParser'
	static defaultProps: TProps = {
		allowUnknownElements: true,
		autoCloseVoidElements: false,
		bindings: {},
		blacklistedAttrs: [/^on.+/i],
		blacklistedTags: ['script'],
		className: '',
		components: {},
		componentsOnly: false,
		disableFragments: false,
		disableKeyGeneration: false,
		jsx: '',
		onError: () => { },
		showWarnings: false,
		renderError: undefined,
		renderInWrapper: true,
		renderUnrecognized: () => null,
	}

	private ParsedChildren: ParsedTree = null

	#getRawTextForExpression: (expression: AcornJSX.Expression) => string = () => ''

	#parseJSX = (jsx: string): JSX.Element | JSX.Element[] | null => {
		const parser = Acorn.Parser.extend(AcornJSX.default({
			autoCloseVoidElements: this.props.autoCloseVoidElements,
		}))
		const wrappedJsx = `<root>${jsx}</root>`
		this.#getRawTextForExpression = (e: AcornJSX.Expression) => wrappedJsx.slice(e.start, e.end)
		let parsed: AcornJSX.Expression[] = []
		try {
			// @ts-ignore - AcornJsx doesn't have typescript typings
			parsed = parser.parse(wrappedJsx, { ecmaVersion: 'latest' })
			// @ts-ignore - AcornJsx doesn't have typescript typings
			parsed = parsed.body[0].expression.children || []
		} catch (error: any) {
			if (this.props.showWarnings) console.warn(error) // eslint-disable-line no-console
			if (this.props.onError) this.props.onError(error)
			if (this.props.renderError) {
				return this.props.renderError({ error: String(error) })
			}
			return null
		}

		return parsed.map(p => this.#parseExpression(p)).filter(Boolean)
	}

	#parseExpression = (expression: AcornJSX.Expression, scope?: Scope): any => {
		switch (expression.type) {
		case 'JSXAttribute':
			if (expression.value === null) return true
			return this.#parseExpression(expression.value, scope)
		case 'JSXElement':
		case 'JSXFragment':
			return this.#parseElement(expression, scope)
		case 'JSXExpressionContainer':
			return this.#parseExpression(expression.expression, scope)
		case 'JSXText':
			const key = this.props.disableKeyGeneration ? undefined : randomHash()
			return this.props.disableFragments
				? expression.value
				: <Fragment key={key}>{expression.value}</Fragment>
		case 'ArrayExpression':
			const arr: any[] = [];
			(expression.elements || []).forEach(el => {
				if (isSpreadElement(el)) {
					const values = this.#parseExpression(el.argument, scope)
					if (values) arr.push(...values)
					return
				}

				const value = this.#parseExpression(el, scope)
				if (value !== undefined) arr.push(value)
			})
			return arr
		case 'ArrowFunctionExpression':
			if (expression.async || expression.generator) {
				this.props.onError?.(new Error('Async and generator arrow functions are not supported.'))
			}

			// Parse function body and construct a Function object
			if (expression.body.type === 'BlockStatement') {
				const paramNames = expression.params.map((param, index) => {
					switch (param.type) {
					case 'Identifier':	return param.name
					case 'RestElement':	return `...${param.argument.name}`
					default: return `arg_${index}`
					}
				})

				// Anything other than straight pass-through of the function parameters
				// requires wrapping the function in an IIFE to handle this mapping logic
				const paramsRequirePreprocessing = expression.params.some(param => param.type !== 'Identifier')
				const body = paramsRequirePreprocessing ?
					`return (${this.#getRawTextForExpression(expression)})(${paramNames.join(', ')})` :
					this.#getRawTextForExpression(expression.body)
				try {
					return createFunctionProxy(
						// eslint-disable-next-line no-new-func
						new Function(...paramNames, body),
						{ ...this.props.bindings, ...scope },
					)
				} catch (error: any) {
					this.props.onError?.(new Error(`Unable to parse function '${this.#getRawTextForExpression(expression)}': ${error}.`))
					return undefined
				}
			}

			return (...args: any[]) : any => {
				const functionScope: Record<string, any> = this.#getFunctionScope(scope, expression, args)
				return this.#parseExpression(expression.body, functionScope)
			}
		case 'BinaryExpression':
			/* eslint-disable eqeqeq,max-len */
			switch (expression.operator) {
			case '-': return this.#parseExpression(expression.left, scope) - this.#parseExpression(expression.right, scope)
			case '!=': return this.#parseExpression(expression.left, scope) != this.#parseExpression(expression.right, scope)
			case '!==': return this.#parseExpression(expression.left, scope) !== this.#parseExpression(expression.right, scope)
			case '*': return this.#parseExpression(expression.left, scope) * this.#parseExpression(expression.right, scope)
			case '**': return this.#parseExpression(expression.left, scope) ** this.#parseExpression(expression.right, scope)
			case '/': return this.#parseExpression(expression.left, scope) / this.#parseExpression(expression.right, scope)
			case '%': return this.#parseExpression(expression.left, scope) % this.#parseExpression(expression.right, scope)
			case '+': return this.#parseExpression(expression.left, scope) + this.#parseExpression(expression.right, scope)
			case '<': return this.#parseExpression(expression.left, scope) < this.#parseExpression(expression.right, scope)
			case '<=': return this.#parseExpression(expression.left, scope) <= this.#parseExpression(expression.right, scope)
			case '==': return this.#parseExpression(expression.left, scope) == this.#parseExpression(expression.right, scope)
			case '===': return this.#parseExpression(expression.left, scope) === this.#parseExpression(expression.right, scope)
			case '>': return this.#parseExpression(expression.left, scope) > this.#parseExpression(expression.right, scope)
			case '>=': return this.#parseExpression(expression.left, scope) >= this.#parseExpression(expression.right, scope)
				/* eslint-enable eqeqeq,max-len */
			}
			return undefined
		case 'CallExpression':
			const parsedCallee = this.#parseExpression(expression.callee, scope)
			if (parsedCallee === undefined) {
				if (this.props.showWarnings) {
					console.warn(`The expression '${this.#getRawTextForExpression(expression)}' could not be resolved, resulting in an undefined return value.`) // eslint-disable-line no-console
				}
				return undefined
			}
			try {
				const args = expression.arguments.map(arg => this.#parseExpression(arg, scope))
				const invocationScope =	{ ...this.props.bindings, ...scope }
				return Reflect.apply(parsedCallee, invocationScope, args)
			} catch (error: any) {
				this.props.onError?.(new Error(`Unable to call expression '${this.#getRawTextForExpression(expression)}': ${error}.`))
				return undefined
			}
		case 'ChainExpression':
			try {
				return this.#parseExpression(expression.expression, scope)
			} catch (error: any) {
				this.props.onError?.(new Error(`Unable to call expression '${this.#getRawTextForExpression(expression)}': ${error}.`))
				return undefined
			}
		case 'ConditionalExpression':
			return this.#parseExpression(expression.test, scope)
				? this.#parseExpression(expression.consequent, scope)
				: this.#parseExpression(expression.alternate, scope)
		case 'ExpressionStatement':
			return this.#parseExpression(expression.expression, scope)
		case 'Identifier':
			return scope?.[expression.name] ??
				this.props.bindings?.[expression.name] ??
				window[expression.name as any]
		case 'Literal':
			return expression.value
		case 'LogicalExpression':
			const left = this.#parseExpression(expression.left, scope)
			const evaluateRightBranch = () => this.#parseExpression(expression.right, scope)

			switch (expression.operator) {
			case '||': return left || evaluateRightBranch()
			case '&&': return left && evaluateRightBranch()
			case '??': return left ?? evaluateRightBranch()
			default: return false
			}
		case 'MemberExpression':
			return this.#parseMemberExpression(expression, scope)
		case 'NewExpression':
			const constructor = this.#parseExpression(expression.callee, scope)
			// eslint-disable-next-line new-cap
			return new constructor(...expression.arguments.map(a => this.#parseExpression(a, scope)))
		case 'ObjectExpression':
			const object: Record<string, any> = {}
			expression.properties.forEach(prop => {
				if (isSpreadElement(prop)) {
					const result = this.#parseExpression(prop.argument, scope)
					Object.entries(result || {}).forEach(([propName, propValue]) => {
						object[propName] = propValue
					})
				} else {
					const fieldName =
						(prop.key as AcornJSX.Identifier).name ||
						(prop.key as AcornJSX.Literal).value
					object[fieldName] = this.#parseExpression(prop.value, scope)
				}
			})
			return object
		case 'TemplateElement':
			return expression.value.cooked
		case 'TemplateLiteral':
			return [...expression.expressions, ...expression.quasis]
				.sort((a, b) => {
					if (a.start < b.start) return -1
					return 1
				})
				.map(item => this.#parseExpression(item, scope))
				.join('')
		case 'ThisExpression':
			return this.props.bindings
		case 'UnaryExpression':
			switch (expression.operator) {
			case '+': return +this.#parseExpression(expression.argument, scope)
			case '-': return -this.#parseExpression(expression.argument, scope)
			case '!': return !this.#parseExpression(expression.argument, scope)
			}
			return undefined
		}
	}

	#parseMemberExpression = (expression: AcornJSX.MemberExpression, scope?: Scope): any => {
		// eslint-disable-next-line prefer-destructuring
		let { object } = expression

		const getPath = (exp: AcornJSX.MemberExpression) =>	(
			exp.computed ?
				this.#parseExpression(exp.property!, scope) :
				exp.property?.name
		)

		const path = [getPath(expression)]

		if (expression.object.type !== 'Literal') {
			while (object && ['MemberExpression', 'Literal'].includes(object?.type)) {
				const { property } = (object as AcornJSX.MemberExpression)
				if ((object as AcornJSX.MemberExpression).computed) {
					path.unshift(this.#parseExpression(property!, scope))
				} else {
					path.unshift(property?.name ?? JSON.parse((property as AcornJSX.MemberExpression)?.raw ?? '""'))
				}

				object = (object as AcornJSX.MemberExpression).object
			}
		}

		const target = this.#parseExpression(object, scope)
		try {
			let parent = target
			const member = path.reduce((value, next) => {
				parent = value
				return expression.optional ? value?.[next] : value[next]
			}, target)
			if (typeof member === 'function') return member.bind(parent)

			return member
		} catch {
			const name = (object as AcornJSX.MemberExpression)?.name || 'unknown'
			this.props.onError?.(new Error(`Unable to parse ${name}["${path.join('"]["')}"]}`))
		}
	}

	#parseName = (element: AcornJSX.JSXIdentifier | AcornJSX.JSXMemberExpression): string => {
		if (element.type === 'JSXIdentifier') { return element.name }
		return `${this.#parseName(element.object)}.${this.#parseName(element.property)}`
	}

	#parseElement = (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	): JSX.Element | JSX.Element[] | null => {
		const { allowUnknownElements, components, componentsOnly, onError } = this.props
		const { children: childNodes = [] } = element
		const openingTag = element.type === 'JSXElement'
			? element.openingElement
			: element.openingFragment
		const { attributes = [] } = openingTag
		const name = element.type === 'JSXElement'
			? this.#parseName(openingTag.name)
			: ''

		const blacklistedAttrs = (this.props.blacklistedAttrs || [])
			.map(attr => (attr instanceof RegExp ? attr : new RegExp(attr, 'i')))
		const blacklistedTags = (this.props.blacklistedTags || [])
			.map(tag => tag.trim().toLowerCase()).filter(Boolean)

		if (/^(html|head|body)$/i.test(name)) {
			return childNodes.map(c => this.#parseElement(c, scope)) as JSX.Element[]
		}
		const tagName = name.trim().toLowerCase()
		if (blacklistedTags.indexOf(tagName) !== -1) {
			onError!(new Error(`The tag <${name}> is blacklisted, and will not be rendered.`))
			return null
		}

		if (name !== '' && !resolvePath(components, name)) {
			if (componentsOnly) {
				onError!(new Error(`The component <${name}> is unrecognized, and will not be rendered.`))
				return this.props.renderUnrecognized!(name)
			}

			if (!allowUnknownElements && document.createElement(name) instanceof HTMLUnknownElement) {
				onError!(new Error(`The tag <${name}> is unrecognized in this browser, and will not be rendered.`))
				return this.props.renderUnrecognized!(name)
			}
		}

		let children
		const component = element.type === 'JSXElement'
			? resolvePath(components, name)
			: Fragment

		if (component || canHaveChildren(name)) {
			children = childNodes.map(node => this.#parseExpression(node, scope))
			if (!component && !canHaveWhitespace(name)) {
				children = children.filter(child => (
					typeof child !== 'string' || !/^\s*$/.test(child)
				))
			}

			if (children.length === 0) {
				children = undefined
			} else if (children.length === 1) {
				[children] = children
			} else if (children.length > 1 && !this.props.disableKeyGeneration) {
				// Add `key` to any child that is a react element (by checking if it has `.type`) if one
				// does not already exist.
				children = children.map((child, key) => (
					(child?.type && !child?.key) ? { ...child, key: child.key || key } : child
				))
			}
		}

		const props: { [key: string]: any } = {
			key: this.props.disableKeyGeneration ? undefined : randomHash(),
		}
		attributes.forEach( // eslint-disable-next-line max-len
			(expr: AcornJSX.JSXAttribute | AcornJSX.JSXAttributeExpression | AcornJSX.JSXSpreadAttribute) => {
				if (expr.type === 'JSXAttribute') {
					const rawName = expr.name.name
					const attributeName = ATTRIBUTES[rawName] || rawName
					// if the value is null, this is an implicitly "true" prop, such as readOnly
					const value = this.#parseExpression(expr, scope)

					const matches = blacklistedAttrs.filter(re => re.test(attributeName))
					if (matches.length === 0) {
						props[attributeName] = value
					}
				} else if (expr.type === 'JSXSpreadAttribute') {
					const spreadExpr = expr.argument!
					const value = this.#parseExpression(spreadExpr, scope)
					if (typeof value === 'object') {
						Object.keys(value || {}).forEach(rawName => {
							const attributeName: string = ATTRIBUTES[rawName] || rawName
							const matches = blacklistedAttrs.filter(re => re.test(attributeName))
							if (matches.length === 0) {
								props[attributeName] = value[rawName]
							}
						})
					}
				}
			},
		)

		if (typeof props.style === 'string') {
			props.style = parseStyle(props.style)
		}
		const lowerName = name.toLowerCase()
		if (lowerName === 'option') {
			children = children.props.children
		}

		return React.createElement(component || lowerName, props, children)
	}

	#getFunctionScope = (
		scope: Scope | undefined,
		expression: AcornJSX.ArrowFunctionExpression,
		args: any[],
	): Scope => {
		const functionScope: Record<string, any> = scope ?? {}
		expression.params.forEach((param, idx) => {
			switch (param.type) {
			case 'Identifier':
				functionScope[param.name] = args[idx]
				break
			case 'ArrayPattern':
				param.elements.forEach((element, elemIdx) => {
					if (element && element.type === 'Identifier') {
						functionScope[element.name] = args[idx][elemIdx]
					}
					if (element && element.type === 'RestElement' && element.argument.type === 'Identifier') {
						functionScope[element.argument.name] = args[idx].slice(elemIdx)
					}
				})
				break
			case 'ObjectPattern':
				param.properties.forEach(property => {
					if (property.type === 'Property' && property.key.type === 'Identifier' && property.value.type === 'Identifier') {
						functionScope[property.value.name] = args[idx][property.key.name]
					}
				})
				break
			case 'AssignmentPattern':
				// Lazily evaluate the default value
				const parseDefaultValue = () => this.#parseExpression(param.right, scope)
				functionScope[param.left.name] = args[idx] !== undefined ? args[idx] : parseDefaultValue()
				break
			case 'RestElement':
				functionScope[param.argument.name] = args.slice(idx)
				break
			}
		})
		return functionScope
	}

	render = (): JSX.Element => {
		const jsx = (this.props.jsx || '').trim().replace(/<!DOCTYPE([^>]*)>/g, '')

		this.ParsedChildren = this.#parseJSX(jsx)
		const className = [...new Set(['jsx-parser', ...String(this.props.className).split(' ')])]
			.filter(Boolean)
			.join(' ')

		return (
			this.props.renderInWrapper
				? <div className={className}>{this.ParsedChildren}</div>
				: <>{this.ParsedChildren}</>
		)
	}
}
/* eslint-enable consistent-return */
