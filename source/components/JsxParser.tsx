/* eslint-disable linebreak-style */
import * as Acorn from 'acorn'
import * as AcornJSX from 'acorn-jsx'
import React, { Fragment, ComponentType, ExoticComponent } from 'react'
import { transpileFunctionBody, isSpreadElement, constructFunction } from '../helpers/functionUtilities'
import { JsxParserError, SourceInfo, buildErrorFromOffsets, getLocationFromOffsets, sanitizeHtml } from '../helpers/errorUtilities'
import ATTRIBUTES from '../constants/attributeNames'
import { canHaveChildren, canHaveWhitespace } from '../constants/specialTags'
import { randomHash } from '../helpers/hash'
import { parseStyle } from '../helpers/parseStyle'
import { resolvePath } from '../helpers/resolvePath'
import { createFunctionProxy } from '../helpers/functionProxy'

type ParsedJSX = React.JSX.Element | boolean | string
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
	fileName?: string,
	jsx?: string,
	onError?: (error: JsxParserError) => void,
	renderError?: (props: { error: string }) => React.JSX.Element | null,
	renderInWrapper?: boolean,
	renderUnrecognized?: (tagName: string) => React.JSX.Element | null,
}
type Scope = Record<string, any>

// The JSX is parsed wrapped in `<root>...</root>`; this prefix length is used to
// map AST/Acorn offsets back onto the user's original (unwrapped) source.
const ROOT_PREFIX_LENGTH = '<root>'.length

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
		fileName: undefined,
		jsx: '',
		onError: () => { },
		renderError: undefined,
		renderInWrapper: true,
		renderUnrecognized: () => null,
	}

	private ParsedChildren: ParsedTree = null
	private lastAttributeName: string | undefined = undefined

	jsx: string = ''
	// The user's original (unwrapped) JSX, against which errors are reported, and the
	// amount by which AST/Acorn offsets must be shifted to map onto it.
	#userJsx: string = ''
	#offsetDelta: number = 0
	// Stack of the active `.map()`/iteration indices.  Each tracked function invocation
	// (see `#trackIterationIndex`) pushes its zero-based call count while it runs, so any
	// element constructed during that invocation reads the producing source-item index from
	// the top of the stack.  Nested iterations stack (innermost wins); empty => undefined.
	// Shared by reference with the per-element parsers spawned for block-bodied functions.
	#loopIndexStack: number[] = []

	#getRawTextForExpression: (expression: AcornJSX.Expression) => string =
		(e: AcornJSX.Expression) => this.jsx.slice(e.start, e.end)

	#getErrorFriendlyTextForExpression: (expression: AcornJSX.Expression) => string =
		(e: AcornJSX.Expression) => {
			const sanitizedText = this.#getRawTextForExpression(e).replaceAll('`', '\\`')
			if (sanitizedText.length > 50) {
				return `${sanitizedText.slice(0, 47)}...`
			}
			return sanitizedText
		}

	#currentLoopIndex = (): number | undefined => (
		this.#loopIndexStack.length ? this.#loopIndexStack[this.#loopIndexStack.length - 1] : undefined
	)

	// Wraps a constructed function so each invocation pushes its zero-based call count onto
	// `#loopIndexStack` for the duration of the call.  This is how a `.map()`-rendered
	// element learns which source item produced it: the Nth callback invocation (= Nth item)
	// makes `#currentLoopIndex()` return N while that callback synchronously builds elements.
	// A `Proxy` is used (rather than a plain wrapper) so the underlying function's behaviour —
	// e.g. the scope-merging `apply` trap from `createFunctionProxy` — is preserved.
	#trackIterationIndex = <T extends Function>(fn: T): T => {
		let invocationCount = 0
		return new Proxy(fn, {
			apply: (target, thisArg, args) => {
				const index = invocationCount
				invocationCount += 1
				this.#loopIndexStack.push(index)
				try {
					return Reflect.apply(target as Function, thisArg, args)
				} finally {
					this.#loopIndexStack.pop()
				}
			},
		})
	}

	// Walks a reference expression (Identifier, MemberExpression, or optional chain) down to
	// its root identifier name — e.g. `handlers.click` and `handlers?.click` both yield
	// `handlers`.  Returns undefined for anything not rooted in a bare identifier.
	#getRootIdentifierName = (node: AcornJSX.Expression | null | undefined): string | undefined => {
		if (!node) return undefined
		switch (node.type) {
		case 'Identifier': return node.name
		case 'MemberExpression': return this.#getRootIdentifierName(node.object as AcornJSX.Expression)
		case 'ChainExpression': return this.#getRootIdentifierName(node.expression)
		default: return undefined
		}
	}

	// Wraps a function passed as an attribute that was resolved out of the local closure scope
	// (i.e. constructed inside a block-bodied function rather than supplied via `bindings`).
	// Such a function is a raw native closure with no error handling, so a throw at invocation
	// time (e.g. a click handler firing) would otherwise escape the parser entirely.  The
	// returned `Proxy` reports the throw to `onError` — located at the attribute site — and then
	// swallows it (returning undefined): re-throwing would surface as a React error and bubble to
	// an error boundary, halting the page.  Non-throwing calls pass through untouched.
	#wrapScopedCallback = <T extends Function>(fn: T, attributeExpr: AcornJSX.JSXAttribute): T => {
		// Capture the producing iteration index eagerly: the handler fires after any `.map()`
		// iteration has unwound, so reading it at throw time would lose which item produced it.
		const loopIndex = this.#currentLoopIndex()
		// A wrapped callback only ever originates from a render-path element parser, which always
		// inherits the consumer's original source, so `#userJsx` is reliably set here.
		const source = this.#userJsx
		const start = attributeExpr.start - this.#offsetDelta
		const end = attributeExpr.end - this.#offsetDelta
		const { fileName, onError } = this.props
		return new Proxy(fn, {
			apply: (target, thisArg, args) => {
				try {
					return Reflect.apply(target as Function, thisArg, args)
				} catch (error: any) {
					onError?.(buildErrorFromOffsets({
						type: 'function-runtime',
						message: error?.message ?? String(error),
						source,
						start,
						end,
						fileName,
						cause: error,
						astNode: attributeExpr,
						loopIndex,
					}))
					return undefined
				}
			},
		})
	}

	// Builds the `sourceInfo` injected into opted-in components, mapping the
	// element's offsets onto the user's original (unwrapped) source.
	#buildSourceInfo = (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
	): SourceInfo => ({
		fileName: this.props.fileName,
		// Raw offsets index `this.jsx` (the wrapped source), yielding the exact element text.
		source: this.#getRawTextForExpression(element),
		location: getLocationFromOffsets(
			this.#userJsx || this.jsx,
			element.start - this.#offsetDelta,
			element.end - this.#offsetDelta,
		),
		// The source-item index of the `.map()`/iteration currently rendering this element
		// (0 when not produced by one), captured at construction — see `#trackIterationIndex`.
		loopIndex: this.#currentLoopIndex(),
		astNode: element,
	})

	// Builds a structured error from the offsets of the given AST node, mapped onto
	// the user's original source.  `cause` is required: the LSP relies solely on it, so
	// every reported error must carry one (a native ES error naming the specific failure).
	#buildError = (
		type: Parameters<typeof buildErrorFromOffsets>[0]['type'],
		message: string,
		expression: AcornJSX.Expression,
		cause: Error,
	): JsxParserError => buildErrorFromOffsets({
		type,
		message,
		source: this.#userJsx || this.jsx,
		start: expression.start - this.#offsetDelta,
		end: expression.end - this.#offsetDelta,
		fileName: this.props.fileName,
		cause,
		astNode: expression,
		loopIndex: this.#currentLoopIndex(),
	})

	#parseJSX = (jsx: string): React.JSX.Element | React.JSX.Element[] | null => {
		const parser = Acorn.Parser.extend(AcornJSX.default({
			autoCloseVoidElements: this.props.autoCloseVoidElements,
		}))
		const wrappedJsx = `<root>${jsx}</root>`
		this.jsx = wrappedJsx
		this.#userJsx = jsx
		this.#offsetDelta = ROOT_PREFIX_LENGTH
		this.#loopIndexStack = []
		let parsed: AcornJSX.Expression[] = []
		try {
			// @ts-ignore - AcornJsx doesn't have typescript typings
			parsed = parser.parse(wrappedJsx, { ecmaVersion: 'latest' })
			// @ts-ignore - AcornJsx doesn't have typescript typings
			parsed = parsed.body[0].expression.children || []
			return parsed.map(p => this.#parseExpression(p)).filter(Boolean)
		} catch (error: any) {
			// Acorn SyntaxErrors expose `.pos`; map it onto the user's source.
			const pos = typeof error?.pos === 'number' ? error.pos - this.#offsetDelta : 0
			const structuredError = buildErrorFromOffsets({
				type: 'parse',
				message: sanitizeHtml(String(error)),
				source: jsx,
				start: pos,
				end: pos,
				fileName: this.props.fileName,
				cause: error,
			})
			if (this.props.onError) this.props.onError(structuredError)
			if (this.props.renderError) return this.props.renderError({ error: String(structuredError) })
			return null
		}
	}

	#parseExpression = (expression: AcornJSX.Expression, scope?: Scope): any => {
		switch (expression.type) {
		case 'JSXAttribute':
			if (expression.value === null) return true
			this.lastAttributeName = expression.name.name
			return this.#parseExpression(expression.value, scope)
		case 'JSXElement':
		case 'JSXFragment':
			this.lastAttributeName = undefined
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
				this.props.onError?.(this.#buildError(
					'unsupported-function',
					'Async and generator arrow functions are not supported.',
					expression,
					new SyntaxError('Async and generator arrow functions are not supported.'),
				))
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
				// When preprocessing, the body is the original arrow source wrapped in this IIFE
				// prefix; the JSX within therefore sits `PREPROCESS_PREFIX.length` chars into the
				// body, after the arrow's own start. Otherwise the body is the raw block statement.
				const PREPROCESS_PREFIX = '{ return ('
				const body = paramsRequirePreprocessing ?
					`${PREPROCESS_PREFIX}${this.#getRawTextForExpression(expression)})(${paramNames.join(', ')}); }` :
					this.#getRawTextForExpression(expression.body)
				// Maps an offset within `body` back onto the consumer's original (unwrapped) source,
				// so block-bodied elements report full-template offsets like everything else.
				const offsetDelta = this.#offsetDelta
				const mapBodyOffsetToSource = paramsRequirePreprocessing
					? (bodyOffset: number) => expression.start + (bodyOffset - PREPROCESS_PREFIX.length) - offsetDelta
					: (bodyOffset: number) => expression.body.start + bodyOffset - offsetDelta
				try {
					// JSX elements cannot be rendered by the vanilla JS runtime, so we need to
					// transpile them into render function calls.  Those render functions are
					// included in the invocation scope, so they can be called from within the
					// function body without requiring additional input arguments.
					const [transpiledBody, jsxRenderFunctions] = transpileFunctionBody(
						body,
						{ ...this.props.bindings, ...scope },
						(elementJsx, elementExpression, elementScope, sourceBaseOffset = 0) => {
							const elementParser = new JsxParser(this.props)
							elementParser.jsx = elementJsx
							// Parse offsets are local to the element fragment.  Reporting `#userJsx` as
							// the full source and offsetting by `-sourceBaseOffset` makes `location`
							// resolve onto the full template, while `jsx` (the fragment) still yields the
							// correct raw `source` text by slicing with the local offsets.
							elementParser.#userJsx = this.#userJsx
							elementParser.#offsetDelta = -sourceBaseOffset
							// Share the iteration-index stack so elements rendered by this block-bodied
							// function pick up the source-item index of the active invocation.
							elementParser.#loopIndexStack = this.#loopIndexStack
							return elementParser.#parseExpression(elementExpression, elementScope)
						},
						mapBodyOffsetToSource,
					)
					// `mapBodyOffsetToSource` maps offsets in the ORIGINAL (pre-transpile) body onto the
					// source; JSX render calls are newline-padded (see `transpileFunctionBody`) so the
					// transpiled body keeps the original line count, letting `constructFunction` resolve
					// runtime-error offsets even when the body contained JSX.
					return this.#trackIterationIndex(createFunctionProxy(
						// eslint-disable-next-line no-new-func
						constructFunction(
							paramNames,
							transpiledBody,
							this.lastAttributeName,
							this.props.onError,
							this.props.fileName,
							mapBodyOffsetToSource,
							this.#userJsx || this.jsx,
						),
						{ ...this.props.bindings, ...scope, ...jsxRenderFunctions },
					) as unknown as Function)
				} catch (error: any) {
					this.props.onError?.(this.#buildError(
						'function-parse',
						`Unable to parse function \`${this.lastAttributeName ?? this.#getErrorFriendlyTextForExpression(expression)}\` => ${error}.`,
						expression,
						error,
					))
					return undefined
				}
			}

			return this.#trackIterationIndex((...args: any[]) : any => {
				const functionScope: Record<string, any> = this.#getFunctionScope(scope, expression, args)
				return this.#parseExpression(expression.body, functionScope)
			})
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
				this.props.onError?.(this.#buildError(
					'invocation',
					`The expression \`${this.#getErrorFriendlyTextForExpression(expression)}\` could not be resolved, resulting in an undefined return value.`,
					expression,
					new TypeError(`\`${this.#getErrorFriendlyTextForExpression(expression.callee)}\` is not a function.`),
				))
				return undefined
			}
			try {
				const args = expression.arguments.map(arg => this.#parseExpression(arg, scope))
				const invocationScope =	{ ...this.props.bindings, ...scope }
				return Reflect.apply(parsedCallee, invocationScope, args)
			} catch (error: any) {
				this.props.onError?.(this.#buildError(
					'call',
					`Unable to call expression \`${this.#getErrorFriendlyTextForExpression(expression)}\` => ${error}.`,
					expression,
					error,
				))
				return undefined
			}
		case 'ChainExpression':
			try {
				return this.#parseExpression(expression.expression, scope)
			} catch (error: any) {
				this.props.onError?.(this.#buildError(
					'chain',
					`Unable to call expression \`${this.#getErrorFriendlyTextForExpression(expression)}\` => ${error}.`,
					expression,
					error,
				))
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
			if (constructor === undefined) {
				this.props.onError?.(this.#buildError(
					'invocation',
					`The expression \`${this.#getErrorFriendlyTextForExpression(expression)}\` could not be resolved, resulting in an undefined return value.`,
					expression,
					new TypeError(`\`${this.#getErrorFriendlyTextForExpression(expression.callee)}\` is not a constructor.`),
				))
				return undefined
			}
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

		// Resolve a single member access into its property key, whether it used optional
		// chaining (`?.`), and the object it reads from (kept for source-aware error text).
		const getSegment = (exp: AcornJSX.MemberExpression) => ({
			key: exp.computed ?
				this.#parseExpression(exp.property!, scope) :
				exp.property?.name ?? JSON.parse((exp.property as AcornJSX.MemberExpression)?.raw ?? '""'),
			optional: !!exp.optional,
			object: exp.object,
		})

		const path = [getSegment(expression)]

		if (expression.object.type !== 'Literal') {
			while (object && ['MemberExpression', 'Literal'].includes(object?.type)) {
				path.unshift(getSegment(object as AcornJSX.MemberExpression))
				object = (object as AcornJSX.MemberExpression).object
			}
		}

		const target = this.#parseExpression(object, scope)
		try {
			let parent = target
			let shortCircuited = false
			const member = path.reduce((value, segment) => {
				if (shortCircuited) return undefined
				parent = value
				if (value == null) {
					// An optional access on a nullish value short-circuits the rest of the chain
					// (`a?.b.c` where `a` is nullish resolves to `undefined`, matching native JS).
					if (segment.optional) {
						shortCircuited = true
						return undefined
					}
					// Non-optional navigation into a nullish value. Throw with the original source
					// path (rather than let the runtime throw, whose message references minified
					// variable names) so `cause` names exactly what the consumer wrote.
					throw new TypeError(`Cannot read \`${segment.key}\` of \`${this.#getErrorFriendlyTextForExpression(segment.object)}\`, which is ${value === null ? 'null' : 'undefined'}.`)
				}
				return value[segment.key]
			}, target)
			if (typeof member === 'function') return member.bind(parent)

			return member
		} catch (error: any) {
			this.props.onError?.(this.#buildError(
				'member-access',
				`Unable to resolve \`${this.#getErrorFriendlyTextForExpression(expression)}\` => ${error}`,
				expression,
				error,
			))
		}
	}

	#parseName = (element: AcornJSX.JSXIdentifier | AcornJSX.JSXMemberExpression): string => {
		if (element.type === 'JSXIdentifier') { return element.name }
		return `${this.#parseName(element.object)}.${this.#parseName(element.property)}`
	}

	#parseElement = (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	): React.JSX.Element | React.JSX.Element[] | null => {
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
			return childNodes.map(c => this.#parseElement(c, scope)) as React.JSX.Element[]
		}
		const tagName = name.trim().toLowerCase()
		if (blacklistedTags.indexOf(tagName) !== -1) {
			onError!(this.#buildError(
				'blacklisted-tag',
				`The tag \`<${name}>\` is blacklisted, and will not be rendered.`,
				element,
				new Error(`The tag <${name}> is blacklisted.`),
			))
			return null
		}

		if (name !== '' && !resolvePath(components, name)) {
			if (componentsOnly) {
				onError!(this.#buildError(
					'unrecognized-component',
					`The component \`<${name}>\` is unrecognized, and will not be rendered.`,
					element,
					new ReferenceError(`The component <${name}> is not defined.`),
				))
				return this.props.renderUnrecognized!(name)
			}

			if (!allowUnknownElements && document.createElement(name) instanceof HTMLUnknownElement) {
				onError!(this.#buildError(
					'unrecognized-tag',
					`The tag \`<${name}>\` is unrecognized in this browser, and will not be rendered.`,
					element,
					new ReferenceError(`The tag <${name}> is not a recognized element.`),
				))
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
					let value = this.#parseExpression(expr, scope)

					// A function resolved out of the local closure `scope` (constructed inside a
					// block-bodied function rather than supplied via `bindings`) is a raw native
					// closure with no error handling.  Wrap it so a throw at invocation time is
					// reported via `onError` (and swallowed).  Functions from `bindings` resolve where
					// `scope` is undefined, so they are left untouched (preserving prop identity).
					const attributeExpression = expr.value?.type === 'JSXExpressionContainer'
						? expr.value.expression
						: undefined
					const rootName = this.#getRootIdentifierName(attributeExpression)
					if (typeof value === 'function' && rootName && scope && rootName in scope) {
						value = this.#wrapScopedCallback(value, expr)
					}

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

		// `sourceInfo` is a reserved, parser-owned prop (like `key`): it is injected
		// after attribute parsing, so it overrides any same-named attribute in the source.
		// Only resolved custom components can opt in, via a truthy `injectSourceInfo`
		// flag on their function; HTML elements render from a string tag name and cannot.
		if (component && (component as { injectSourceInfo?: unknown }).injectSourceInfo) {
			props.sourceInfo = this.#buildSourceInfo(element)
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

	render = (): React.JSX.Element => {
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
