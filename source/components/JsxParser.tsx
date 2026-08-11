/* eslint-disable linebreak-style */
import * as Acorn from 'acorn'
import * as AcornJSX from 'acorn-jsx'
import React, { Fragment, ComponentType, ExoticComponent } from 'react'
import { transpileFunctionBody, isSpreadElement, constructFunction } from '../helpers/functionUtilities'
import { JsxParserError, SourceInfo, SourceLocation, buildErrorFromOffsets, getLocationFromOffsets, sanitizeHtml, trimExcessLeadingWhitespaceFromSource } from '../helpers/errorUtilities'
import { ProfileData, ProfilerNodeTiming, ProfilerSession } from '../helpers/profilerUtilities'
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
	onProfile?: (data: ProfileData) => void,
	profileReactRender?: boolean,
	renderError?: (props: { error: string }) => React.JSX.Element | null,
	renderInWrapper?: boolean,
	renderUnrecognized?: (tagName: string) => React.JSX.Element | null,
}
type Scope = Record<string, any>

// Result of `#resolveElement`: either an early-return value (blacklisted tag, unrecognized
// component/tag, or an `html`/`head`/`body` wrapper whose children are unwrapped) or the resolved
// fields the two `#parseElement` variants (`#renderElement`/`#profileElement`) build the element from.
type ElementResolution =
	| { done: true, value: React.JSX.Element | React.JSX.Element[] | null }
	| {
		done: false,
		name: string,
		component: ComponentType | ExoticComponent | typeof Fragment | undefined,
		childNodes: any[],
		attributes: any[],
		blacklistedAttrs: RegExp[],
	}
// The resolved (renderable) case of `ElementResolution`, shared by the element sub-step helpers.
type ResolvedElement = Extract<ElementResolution, { done: false }>

// Captured when a profiled custom component's element is built, carried in that component's
// `React.Profiler` onRender closure, and combined with the commit-phase timings on flush.
// `instanceId`/`parentInstanceId` reconstruct exact per-instance React nesting (see `#parseElement`).
type ReactProfileMeta = {
	cycleId: string
	instanceId: number
	parentInstanceId: number | null
	componentName: string
	source: string
	location: SourceLocation
	loopIndex: number | undefined
}
type ReactProfileEntry = {
	meta: ReactProfileMeta
	phase: 'mount' | 'update' | 'nested-update'
	actualDuration: number
	baseDuration: number
	startTime: number
	commitTime: number
}

// The JSX is parsed wrapped in `<root>...</root>`; this prefix length is used to
// map AST/Acorn offsets back onto the user's original (unwrapped) source.
const ROOT_PREFIX_LENGTH = '<root>'.length

// Carries the enclosing `JsxParser`'s current `cycleId` down to nested `JsxParser` instances (which
// render as React descendants of the parent's output).  A nested parser reads this as its
// `parentCycleId`, letting a profiling consumer correlate a page's main + sub-template renders with
// no app wiring.  The context value is a STABLE holder object (mutated in place each parent render),
// not the `cycleId` string itself — so a per-render-changing id propagates WITHOUT forcing memoized
// descendants to re-render (which would skew the render timings).
const CycleCorrelationContext = React.createContext<{ current: string | null } | null>(null)

/* eslint-disable consistent-return */
export default class JsxParser extends React.Component<TProps> {
	static displayName = 'JsxParser'
	// Read the nearest ancestor parser's cycleId holder (see `CycleCorrelationContext`).
	static contextType = CycleCorrelationContext
	declare context: React.ContextType<typeof CycleCorrelationContext>
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
		onProfile: undefined,
		profileReactRender: false,
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

	// Single-entry memo of the last successful top-level parse.  The Acorn AST depends ONLY on the
	// raw `jsx` prop and `autoCloseVoidElements`, so it can be reused across renders that change
	// only bindings/scope/other props — the walk (`#parseExpression`) still runs every render.
	// Read-only: the parser never mutates AST nodes, so sharing the same node instances across
	// renders is safe.  GC'd with the component — no eviction needed.
	//
	// Keyed on the RAW `props.jsx` reference (compared with `===`) plus `autoCloseVoidElements`,
	// rather than a rebuilt composite string: for a large `jsx` a stable prop reference makes the
	// hit check O(1) (pointer short-circuit) with no per-render allocation or full-string scan.
	// The derived processed/wrapped strings are cached too, so a hit restores `#userJsx`/`this.jsx`
	// by reference (no re-`trim`/`replace`, no re-wrap) — see `#parseJSX`.
	#cachedAst: AcornJSX.Expression[] | null = null
	#cachedJsxProp: string | undefined = undefined
	#cachedAutoClose: boolean | undefined = undefined
	#cachedWrappedJsx: string = ''
	#cachedProcessedJsx: string = ''

	// Profiling state.  `#profiler` is non-null only while an `onProfile` prop is supplied; it
	// persists across the render→lazy-callback boundary within a React render pass (a host may
	// invoke a render-prop after `#parseJSX` returns) and is shared by reference into the
	// per-element sub-parsers spawned for block-bodied functions.  `#profileCycleId` is the
	// per-render-pass join key stamped onto every batch (main walk + its lazy callbacks); it is
	// a human-readable timestamp made unique by the per-instance `#profileInstanceHash` + a
	// same-millisecond counter.  `#parentCycleId` is the enclosing parser's current `cycleId` (read
	// from context), captured per render — `null` for a root parser.  `#cycleIdHolder` is this
	// instance's stable holder published to descendants via context; its `.current` is set to the
	// latest `#profileCycleId` each render so a nested parser reads the parent's current cycle without
	// the context value changing identity (no forced re-renders / no timing skew).
	#profiler: ProfilerSession | null = null
	#profileCycleId: string = ''
	#profileInstanceHash: string = randomHash()
	#parentCycleId: string | null = null
	#cycleIdHolder: { current: string | null } = { current: null }
	#profileSeq: number = 0

	// React-render profiling state (active only when `onProfile` is set AND `profileReactRender` is
	// true).  `#reactProfilingOn` is the per-render decision read on the hot path in `#parseElement`.
	// `#reactParentStack`/`#reactInstanceSeq` reconstruct React nesting during construction (reset per
	// render, like `#loopIndexStack`).  `#reactBuffer` accumulates each commit's `onRender` calls; a
	// single `queueMicrotask` flush (`#reactFlushScheduled`) delivers them as one `'react'` batch.
	#reactProfilingOn: boolean = false
	#reactParentStack: number[] = []
	#reactInstanceSeq: number = 0
	#reactBuffer: ReactProfileEntry[] = []
	#reactFlushScheduled: boolean = false

	// Reassignable dispatch target for the AST walk.  Pointed once per render (in `#parseJSX`) — and
	// per sub-parser in the block-body share block — at either `#evaluateExpression` (profiling off:
	// the original method verbatim, no indirection or allocation) or `#profileExpression` (profiling
	// on).  Every recursive `this.#parseExpression` call inside `#evaluateExpression` resolves to the
	// chosen target, keeping a whole subtree on one path.  Always assigned before the walk uses it.
	#parseExpression!: (expression: AcornJSX.Expression, scope?: Scope) => any

	// Reassignable function-wrapping target, chosen alongside `#parseExpression`: `#trackIterationIndex`
	// (profiling off) or `#profileIterationIndex` (profiling on).  Keeps the per-invocation `apply`
	// trap free of profiling checks on the common path.  Always assigned before the walk uses it.
	#trackIteration!: <T extends Function>(fn: T, sourceExpression?: AcornJSX.Expression) => T

	// Reassignable per-element dispatch target.  `#parseElement` is called for EVERY rendered element,
	// so it is effectively hot path.  Its only profiling concern is React-render bookkeeping
	// (instance-id/parent-stack + `React.Profiler` wrap) — parser timing is handled upstream by
	// `#parseExpression`.  Bound once per render (in `#parseJSX`) — and per sub-parser in the block-body
	// share block — at either `#renderElement` (React-render profiling off: the original walk, no
	// bookkeeping) or `#profileElement` (on).  Gated on `#reactProfilingOn`, NOT `onProfile`, so the
	// "parser profiling on but `profileReactRender` off" state stays on the plain path.  Always assigned
	// before the walk uses it.
	#parseElement!: (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	) => React.JSX.Element | React.JSX.Element[] | null

	#getRawTextForExpression: (expression: AcornJSX.Expression) => string =
		(e: AcornJSX.Expression) => this.jsx.slice(e.start, e.end)

	// The raw expression text, de-indented for profiling `source` values: the first line is
	// already flush-left (it begins mid-line at the node's start offset), so only the trailing
	// lines' common leading whitespace is stripped.  Kept separate from `#getRawTextForExpression`
	// so its non-profiling callers (`sourceInfo`, errors, function transpilation) keep raw text.
	#getProfileSourceForExpression: (expression: AcornJSX.Expression) => string =
		(e: AcornJSX.Expression) => trimExcessLeadingWhitespaceFromSource(this.#getRawTextForExpression(e))

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
	//
	// This is the plain variant used when profiling is off; its `apply` trap carries no profiling
	// logic at all.  `#trackIteration` (bound once per render in `#parseJSX`) selects between this
	// and `#profileIterationIndex`, so the common path never pays for a per-call profiler check —
	// mirroring the `#parseExpression`/`#evaluateExpression` split.
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

	// The profiling variant of `#trackIterationIndex`: identical loop-index tracking, plus lazy-batch
	// capture.  A *lazy* invocation is one made with no profiling batch already open — a host
	// component calling this render-prop/function-child after the main walk (and any enclosing
	// callback) has returned; it gets its own batch bracketing exactly this call's subtree.  When a
	// batch is already open (a `.map()` callback running inside the walk, or a nested callback),
	// `lazy` is false and the nested `#parseExpression` calls simply record into the open batch —
	// correct nesting, no double-counting.  `#profiler` is re-read here because a later
	// non-profiling render may have cleared it after this function was constructed.
	#profileIterationIndex = <T extends Function>(fn: T, sourceExpression?: AcornJSX.Expression): T => {
		let invocationCount = 0
		return new Proxy(fn, {
			apply: (target, thisArg, args) => {
				const index = invocationCount
				invocationCount += 1
				this.#loopIndexStack.push(index)
				const profiler = this.#profiler
				const lazy = profiler != null && !profiler.active
				if (lazy) profiler!.begin()
				const started = lazy ? profiler!.now() : 0
				try {
					return Reflect.apply(target as Function, thisArg, args)
				} finally {
					if (lazy) {
						const totalTime = profiler!.now() - started
						const { renderId, nodes } = profiler!.end()
						// Suppress non-rendering callbacks (e.g. an event handler doing `setState`): with
						// no nodes there is nothing to profile.  `sourceExpression` is always supplied for
						// parser-built functions; the guard keeps TS honest for the optional param.
						if (nodes.length && sourceExpression) {
							this.props.onProfile?.({
								fileName: this.props.fileName,
								parentCycleId: this.#parentCycleId,
								cycleId: this.#profileCycleId,
								renderId,
								trigger: 'callback',
								startTime: started,
								totalTime,
								nodes,
								callback: {
									location: getLocationFromOffsets(
										this.#userJsx || this.jsx,
										sourceExpression.start - this.#offsetDelta,
										sourceExpression.end - this.#offsetDelta,
									),
									source: this.#getProfileSourceForExpression(sourceExpression),
									// Read before the pop below: the top of the stack is this invocation's index.
									loopIndex: this.#currentLoopIndex(),
								},
							})
						}
					}
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

	#parseJSX = (): React.JSX.Element | React.JSX.Element[] | null => {
		const rawJsx = this.props.jsx
		const autoClose = this.props.autoCloseVoidElements

		// Constant/empty every render (even on a hit): the walk reads these for offset math and
		// loop-index tracking. Cheap, so shared by both branches below.
		this.#offsetDelta = ROOT_PREFIX_LENGTH
		this.#loopIndexStack = []
		// React-nesting bookkeeping is per render; resetting here bounds any imbalance (e.g. a throw
		// mid-walk) to a single render, exactly like `#loopIndexStack` above.
		this.#reactParentStack = []
		this.#reactInstanceSeq = 0

		let parsed: AcornJSX.Expression[]
		if (
			this.#cachedAst
			// `===` on the raw prop: O(1) when the consumer passes a stable reference (the norm for a
			// large template); an O(n) memcmp — but no allocation — when a fresh, content-equal string
			// is passed, which still hits. `autoCloseVoidElements` is the only other parse input.
			&& this.#cachedJsxProp === rawJsx
			&& this.#cachedAutoClose === autoClose
		) {
			// Hit: reuse the cached derivations (reference assignments — no re-trim/replace, no re-wrap,
			// no full-string scan beyond the key compare above).
			this.jsx = this.#cachedWrappedJsx
			this.#userJsx = this.#cachedProcessedJsx
			parsed = this.#cachedAst
		} else {
			const jsx = (rawJsx || '').trim().replace(/<!DOCTYPE([^>]*)>/g, '')
			const wrappedJsx = `<root>${jsx}</root>`
			this.jsx = wrappedJsx
			this.#userJsx = jsx
			try {
				const parser = Acorn.Parser.extend(AcornJSX.default({
					autoCloseVoidElements: autoClose,
				}))
				// @ts-ignore - AcornJsx doesn't have typescript typings
				const root = parser.parse(wrappedJsx, { ecmaVersion: 'latest' })
				// @ts-ignore - AcornJsx doesn't have typescript typings
				parsed = root.body[0].expression.children || []
			} catch (error: any) {
				// Only the parse throws Acorn SyntaxErrors (which expose `.pos`); the walk self-reports
				// its own failures via `#buildError`/`onError`, so it stays outside this catch. Parse
				// failures are not cached: the `onError`/`renderError` side effects must fire every
				// render, and leaving the cache fields untouched lets a later fix produce a fresh miss.
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
			this.#cachedAst = parsed
			this.#cachedJsxProp = rawJsx
			this.#cachedAutoClose = autoClose
			this.#cachedWrappedJsx = wrappedJsx
			this.#cachedProcessedJsx = jsx
		}

		// Decide profiling for this render pass (presence-based, like `onError`).  Bind the walk's
		// dispatch target once here — no per-node branch — and, when profiling, mint the per-cycle
		// join key and open the main batch.  A parent may add/remove `onProfile` between renders, so
		// this is re-decided every render rather than once at construction.
		if (this.props.onProfile) {
			if (!this.#profiler) this.#profiler = new ProfilerSession()
			this.#profileSeq += 1
			this.#profileCycleId = `${new Date().toISOString()}-${this.#profileInstanceHash}-${this.#profileSeq}`
			// Publish this render's cycleId to nested parsers (stable holder — see context) and capture
			// the enclosing parser's current cycleId (or `null` at the root) as this render's parent.
			this.#cycleIdHolder.current = this.#profileCycleId
			this.#parentCycleId = this.context ? this.context.current : null
			this.#parseExpression = this.#profileExpression
			this.#trackIteration = this.#profileIterationIndex
			// React-render profiling is a distinct opt-in on top of parser profiling: it modifies the
			// element tree (Profiler wrappers) and only reports under a dev/profiling React build.
			this.#reactProfilingOn = this.props.profileReactRender === true
			// `#parseElement` only ever does React-render bookkeeping, so it is gated on
			// `#reactProfilingOn` — NOT `onProfile`.  With parser profiling on but `profileReactRender`
			// off, the per-element path stays plain.
			this.#parseElement = this.#reactProfilingOn ? this.#profileElement : this.#renderElement
			this.#profiler.begin()
			const start = this.#profiler.now()
			const result = parsed.map(p => this.#parseExpression(p)).filter(Boolean)
			const totalTime = this.#profiler.now() - start
			const { renderId, nodes } = this.#profiler.end()
			this.props.onProfile({
				fileName: this.props.fileName,
				parentCycleId: this.#parentCycleId,
				cycleId: this.#profileCycleId,
				renderId,
				trigger: 'render',
				startTime: start,
				totalTime,
				nodes,
			})
			return result
		}

		this.#profiler = null
		this.#reactProfilingOn = false
		this.#parseExpression = this.#evaluateExpression
		this.#trackIteration = this.#trackIterationIndex
		this.#parseElement = this.#renderElement
		return parsed.map(p => this.#parseExpression(p)).filter(Boolean)
	}

	// Records one custom component's React commit timing (from its `React.Profiler.onRender`) and
	// schedules a single microtask flush.  Every `onRender` for a commit fires synchronously, so the
	// microtask sees the complete set; `#flushReactProfile` then emits one `'react'` batch.
	#collectReactTiming = (
		meta: ReactProfileMeta,
		phase: 'mount' | 'update' | 'nested-update',
		actualDuration: number,
		baseDuration: number,
		startTime: number,
		commitTime: number,
	): void => {
		this.#reactBuffer.push({ meta, phase, actualDuration, baseDuration, startTime, commitTime })
		if (!this.#reactFlushScheduled) {
			this.#reactFlushScheduled = true
			queueMicrotask(() => this.#flushReactProfile())
		}
	}

	// Flushes the buffered React commit timings as `'react'` batches — **one batch per React commit**.
	// A single render cycle (one `cycleId`) can be committed several times (mount, then any
	// update/nested-update), and each commit re-fires `onRender` for the affected Profilers under the
	// same `cycleId`.  Self-time subtraction is only valid *within* a commit (React's `actualDuration`
	// is inclusive of nested Profilers per commit), so entries must be partitioned per commit before
	// the tree/`selfTime` math — otherwise a cheap nested-update parent gets a mount-sized child total
	// subtracted and `selfTime` goes negative.  Batches from one cycle share `cycleId` (the join key)
	// and differ by `commitTime`/`phase`/`renderId`.
	#flushReactProfile = (): void => {
		const buffer = this.#reactBuffer
		this.#reactBuffer = []
		this.#reactFlushScheduled = false
		const { onProfile } = this.props
		if (!onProfile || !buffer.length || !this.#profiler) return

		// Group by cycle first: instance ids reset per parse (`#reactInstanceSeq`), so they are only
		// unique within a cycle, and the buffer may span more than one parse.
		const byCycle = new Map<string, ReactProfileEntry[]>()
		buffer.forEach(entry => {
			const group = byCycle.get(entry.meta.cycleId)
			if (group) group.push(entry)
			else byCycle.set(entry.meta.cycleId, [entry])
		})

		byCycle.forEach((cycleEntries, cycleId) => {
			// Partition a cycle's entries (in arrival order) into per-commit runs.  Every Profiler
			// fires at most once per commit and a commit's `onRender`s are contiguous, so a repeated
			// `instanceId` marks the start of the next commit.  Resolution-independent (unlike grouping
			// by `commitTime`, which the clock clamp can collapse for an immediate nested-update).
			const commitRuns: ReactProfileEntry[][] = []
			let seen = new Set<number>()
			let run: ReactProfileEntry[] = []
			cycleEntries.forEach(entry => {
				if (seen.has(entry.meta.instanceId)) {
					commitRuns.push(run)
					run = []
					seen = new Set<number>()
				}
				run.push(entry)
				seen.add(entry.meta.instanceId)
			})
			if (run.length) commitRuns.push(run)

			commitRuns.forEach(entries => {
				const actualById = new Map<number, number>()
				const parentById = new Map<number, number | null>()
				entries.forEach(e => {
					actualById.set(e.meta.instanceId, e.actualDuration)
					parentById.set(e.meta.instanceId, e.meta.parentInstanceId)
				})
				// Direct-children inclusive time per instance, for exclusive `selfTime`.
				const childTotalById = new Map<number, number>()
				entries.forEach(e => {
					const parent = e.meta.parentInstanceId
					if (parent !== null && actualById.has(parent)) {
						childTotalById.set(parent, (childTotalById.get(parent) ?? 0) + e.actualDuration)
					}
				})
				const depthOf = (instanceId: number): number => {
					let depth = 0
					let current = parentById.get(instanceId) ?? null
					while (current !== null && actualById.has(current)) {
						depth += 1
						current = parentById.get(current) ?? null
					}
					return depth
				}
				const nodes: ProfilerNodeTiming[] = entries.map(entry => {
					const { meta, phase, actualDuration, baseDuration, startTime, commitTime } = entry
					return {
						id: meta.instanceId,
						// A parent outside this commit (e.g. lazily-invoked subtree) surfaces as a root.
						parentId: meta.parentInstanceId !== null && actualById.has(meta.parentInstanceId)
							? meta.parentInstanceId
							: null,
						depth: depthOf(meta.instanceId),
						nodeType: meta.componentName,
						source: meta.source,
						location: meta.location,
						startTime,
						selfTime: actualDuration - (childTotalById.get(meta.instanceId) ?? 0),
						totalTime: actualDuration,
						loopIndex: meta.loopIndex,
						phase,
						baseDuration,
						commitTime,
						componentName: meta.componentName,
					}
				})
				const totalTime = nodes
					.filter(n => n.parentId === null)
					.reduce((sum, n) => sum + n.totalTime, 0)
				onProfile({
					fileName: this.props.fileName,
					parentCycleId: this.#parentCycleId,
					cycleId,
					renderId: this.#profiler!.nextRenderId(),
					trigger: 'react',
					startTime: Math.min(...nodes.map(n => n.startTime)),
					totalTime,
					nodes,
				})
			})
		})
	}

	// Times a single node's evaluation and records it against the active profiling batch, then
	// recurses (children flow back through `this.#parseExpression`, so they nest under this frame).
	// The `active` check is a safety valve for any entry made outside an open batch; on the normal
	// profiling path the batch is always open, so nodes record.
	#profileExpression = (expression: AcornJSX.Expression, scope?: Scope): any => {
		const profiler = this.#profiler
		if (!profiler || !profiler.active) return this.#evaluateExpression(expression, scope)
		const frame = profiler.enter()
		try {
			return this.#evaluateExpression(expression, scope)
		} finally {
			profiler.exit(frame, {
				nodeType: expression.type,
				source: this.#getProfileSourceForExpression(expression),
				location: getLocationFromOffsets(
					this.#userJsx || this.jsx,
					expression.start - this.#offsetDelta,
					expression.end - this.#offsetDelta,
				),
				loopIndex: this.#currentLoopIndex(),
			})
		}
	}

	#evaluateExpression = (expression: AcornJSX.Expression, scope?: Scope): any => {
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
							// Share the profiling session so this sub-parser's nodes record into the same
							// batch, keeping the timing tree connected across the block-body boundary.  The
							// sub-parser must dispatch through *its own* `#profileExpression` (bound to its
							// own offset context), not the outer one — so point it there when profiling is on.
							elementParser.#profiler = this.#profiler
							elementParser.#parseExpression = this.#profiler
								? elementParser.#profileExpression
								: elementParser.#evaluateExpression
							elementParser.#trackIteration = this.#profiler
								? elementParser.#profileIterationIndex
								: elementParser.#trackIterationIndex
							// Share React-render enablement + the cycle join key so components rendered by this
							// block-bodied callback are wrapped and tagged with the same cycle.  The sub-parser
							// keeps its own react parent-stack/buffer and flushes its own `'react'` batch.
							elementParser.#reactProfilingOn = this.#reactProfilingOn
							elementParser.#profileCycleId = this.#profileCycleId
							// The sub-parser's `#parseJSX` never runs, so bind its per-element dispatch here
							// too — to `#profileElement` when React-render profiling is on (matching the
							// gate in `#parseJSX`), otherwise the plain `#renderElement`.
							elementParser.#parseElement = this.#reactProfilingOn
								? elementParser.#profileElement
								: elementParser.#renderElement
							return elementParser.#parseExpression(elementExpression, elementScope)
						},
						mapBodyOffsetToSource,
					)
					// `mapBodyOffsetToSource` maps offsets in the ORIGINAL (pre-transpile) body onto the
					// source; JSX render calls are newline-padded (see `transpileFunctionBody`) so the
					// transpiled body keeps the original line count, letting `constructFunction` resolve
					// runtime-error offsets even when the body contained JSX.
					return this.#trackIteration(createFunctionProxy(
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
					) as unknown as Function, expression)
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

			return this.#trackIteration((...args: any[]) : any => {
				const functionScope: Record<string, any> = this.#getFunctionScope(scope, expression, args)
				return this.#parseExpression(expression.body, functionScope)
			}, expression)
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

	// Resolves an element's identity and validity: parses its name, resolves the component, and
	// applies the blacklist/`componentsOnly`/`allowUnknownElements` rules.  Returns `{ done: true }`
	// with the value to return for the cases that short-circuit before rendering (an
	// `html`/`head`/`body` wrapper whose children are unwrapped, a blacklisted tag, or an
	// unrecognized component/tag), or `{ done: false }` with the fields the two `#parseElement`
	// variants build the element from.  Shared verbatim by `#renderElement` and `#profileElement`.
	#resolveElement = (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	): ElementResolution => {
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
			return { done: true, value: childNodes.map(c => this.#parseElement(c, scope)) as React.JSX.Element[] }
		}
		const tagName = name.trim().toLowerCase()
		if (blacklistedTags.indexOf(tagName) !== -1) {
			onError!(this.#buildError(
				'blacklisted-tag',
				`The tag \`<${name}>\` is blacklisted, and will not be rendered.`,
				element,
				new Error(`The tag <${name}> is blacklisted.`),
			))
			return { done: true, value: null }
		}

		if (name !== '' && !resolvePath(components, name)) {
			if (componentsOnly) {
				onError!(this.#buildError(
					'unrecognized-component',
					`The component \`<${name}>\` is unrecognized, and will not be rendered.`,
					element,
					new ReferenceError(`The component <${name}> is not defined.`),
				))
				return { done: true, value: this.props.renderUnrecognized!(name) }
			}

			if (!allowUnknownElements && document.createElement(name) instanceof HTMLUnknownElement) {
				onError!(this.#buildError(
					'unrecognized-tag',
					`The tag \`<${name}>\` is unrecognized in this browser, and will not be rendered.`,
					element,
					new ReferenceError(`The tag <${name}> is not a recognized element.`),
				))
				return { done: true, value: this.props.renderUnrecognized!(name) }
			}
		}

		const component = element.type === 'JSXElement'
			? resolvePath(components, name)
			: Fragment
		return { done: false, name, component, childNodes, attributes, blacklistedAttrs }
	}

	// Parses and normalizes an element's children (whitespace filtering for host tags, single-child
	// unwrapping, and key generation for multi-child lists).  Shared by both `#parseElement` variants;
	// carries no profiling logic — the profiling variant brackets the CALL to this with its
	// parent-stack push/pop so nested elements resolve their React parent correctly.
	#parseElementChildren = (resolved: ResolvedElement, scope?: Scope): any => {
		const { component, name, childNodes } = resolved
		let children
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
		return children
	}

	// Builds an element's props: parses each attribute (honouring the attribute blacklist and
	// wrapping scoped callbacks), normalizes `style`, and injects `sourceInfo` into opted-in
	// components.  Shared by both `#parseElement` variants; carries no profiling logic.
	#buildElementProps = (
		resolved: ResolvedElement,
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	): { [key: string]: any } => {
		const { attributes, blacklistedAttrs, component } = resolved
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
		return props
	}

	// Applies the `<option>` single-child special-case and creates the React element.  Shared so both
	// `#parseElement` variants produce the identical `rendered` element (the profiling variant wraps
	// the result in a `React.Profiler`).
	#finishElement = (
		resolved: ResolvedElement,
		children: any,
		props: { [key: string]: any },
	): React.JSX.Element => {
		const lowerName = resolved.name.toLowerCase()
		const finalChildren = lowerName === 'option' ? children.props.children : children
		return React.createElement(resolved.component || lowerName, props, finalChildren)
	}

	// The plain per-element variant (React-render profiling off): resolve → children → props →
	// create.  Bound to `#parseElement` when `#reactProfilingOn` is false — byte-for-byte the original
	// walk with no instance-id/parent-stack bookkeeping and no `React.Profiler` wrap.
	#renderElement = (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	): React.JSX.Element | React.JSX.Element[] | null => {
		const resolved = this.#resolveElement(element, scope)
		if (resolved.done) return resolved.value
		const children = this.#parseElementChildren(resolved, scope)
		const props = this.#buildElementProps(resolved, element, scope)
		return this.#finishElement(resolved, children, props)
	}

	// The React-render profiling variant (bound only when `#reactProfilingOn` is true).  Identical to
	// `#renderElement` except it reconstructs exact React nesting and wraps every rendered element in a
	// transparent `React.Profiler`.
	#profileElement = (
		element: AcornJSX.JSXElement | AcornJSX.JSXFragment,
		scope?: Scope,
	): React.JSX.Element | React.JSX.Element[] | null => {
		const resolved = this.#resolveElement(element, scope)
		// Early-return elements (html/head/body unwrap, blacklisted, unrecognized) are not profiled
		// nodes — they consume no instance id and are not wrapped, exactly as on the plain path.
		if (resolved.done) return resolved.value

		// React-render profiling wraps EVERY rendered element — host tags, custom components, and
		// fragments — so the timing tree has no gaps.  Allocate this element's instance id and read its
		// enclosing profiled element *before* parsing children, so nested elements pick this up as
		// their parent — reconstructing exact React nesting even across `.map()`-looped instances.
		const reactInstanceId = this.#reactInstanceSeq
		this.#reactInstanceSeq += 1
		const reactParentInstanceId = this.#reactParentStack.length
			? this.#reactParentStack[this.#reactParentStack.length - 1]
			: null
		this.#reactParentStack.push(reactInstanceId)

		const children = this.#parseElementChildren(resolved, scope)

		// Children are built; this element is no longer the enclosing parent for what follows.
		this.#reactParentStack.pop()

		const props = this.#buildElementProps(resolved, element, scope)
		const rendered = this.#finishElement(resolved, children, props)

		// Wrap the element in a transparent `React.Profiler` (no DOM node).  The Profiler carries the
		// `key`, so list reconciliation and the multi-child key pass above keep working.  Its onRender
		// closure captures this element's `meta`; commit-phase timings are collected + flushed as a
		// `'react'` batch.  `element` is the AST node — its offsets map to the user's source.
		// Label: a custom component's display name; else the host tag name; else `'Fragment'`.
		const { name, component } = resolved
		const customName = component && component !== Fragment
			? (component as { displayName?: string, name?: string }).displayName
				|| (component as { name?: string }).name
			: undefined
		const meta: ReactProfileMeta = {
			cycleId: this.#profileCycleId,
			instanceId: reactInstanceId,
			parentInstanceId: reactParentInstanceId,
			componentName: customName || name || 'Fragment',
			source: this.#getProfileSourceForExpression(element),
			location: getLocationFromOffsets(
				this.#userJsx || this.jsx,
				element.start - this.#offsetDelta,
				element.end - this.#offsetDelta,
			),
			loopIndex: this.#currentLoopIndex(),
		}
		const onRender = (
			_id: string,
			phase: 'mount' | 'update' | 'nested-update',
			actualDuration: number,
			baseDuration: number,
			startTime: number,
			commitTime: number,
		): void => {
			this.#collectReactTiming(meta, phase, actualDuration, baseDuration, startTime, commitTime)
		}
		return React.createElement(React.Profiler, { id: meta.componentName, key: props.key, onRender }, rendered)
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
		// `#parseJSX` reads `this.props.jsx` directly and does its own preprocessing (skipped on a
		// cache hit), so the (potentially large) source is not re-trimmed/wrapped on every render.
		this.ParsedChildren = this.#parseJSX()
		const className = [...new Set(['jsx-parser', ...String(this.props.className).split(' ')])]
			.filter(Boolean)
			.join(' ')

		const output = this.props.renderInWrapper
			? <div className={className}>{this.ParsedChildren}</div>
			: <>{this.ParsedChildren}</>

		// When profiling, publish this instance's cycleId holder to nested `JsxParser` descendants so
		// they can record their `parentCycleId` (see `CycleCorrelationContext`).  The holder identity is
		// stable, so it never forces a descendant to re-render.  When off, output is left untouched.
		return this.props.onProfile
			? (
				<CycleCorrelationContext.Provider value={this.#cycleIdHolder}>
					{output}
				</CycleCorrelationContext.Provider>
			)
			: output
	}
}
/* eslint-enable consistent-return */
