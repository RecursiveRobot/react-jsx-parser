import { SourceLocation } from './errorUtilities'

/// Timing for a single AST node evaluated during one profiling batch.  A batch's
/// `nodes` array is emitted in post-order; `parentId`/`depth` let a visualizer
/// rebuild the tree.
export interface ProfilerNodeTiming {
	/// Unique within the batch.  Assigned on entry (pre-order), so a child's
	/// `parentId` always references an already-numbered enclosing node.
	id: number
	/// The enclosing node's `id`, or `null` for a batch-root node.
	parentId: number | null
	/// Nesting depth within the batch (batch-root nodes are `0`).
	depth: number
	/// The AST node type, e.g. `'JSXElement'`, `'CallExpression'`.
	nodeType: string
	/// The node's source text.  Lines after the first are de-indented (their common leading
	/// whitespace removed), so it reads cleanly rather than carrying the template's original
	/// indentation — it is therefore not a byte-exact slice of the source at `location`.
	source: string
	/// The node's position within the consumer's original (unwrapped) source.
	location: SourceLocation
	/// The clock value (`performance.now()`-based, so comparable across batches and with React's own
	/// Profiler times) when this node's work began — the frame's entry for parser nodes, React's
	/// `startTime` for `trigger: 'react'` nodes.
	startTime: number
	/// Milliseconds spent in this node alone (inclusive time minus children's inclusive time).
	selfTime: number
	/// Milliseconds spent in this node and its whole subtree.
	totalTime: number
	/// The source-item index of the `.map()`/iteration that produced this node
	/// (`undefined` when none is active) — see `#trackIterationIndex`.
	loopIndex: number | undefined
	/// React commit phase for the node — present only on `trigger: 'react'` nodes, whose
	/// timings come from `React.Profiler.onRender` rather than the parser walk.
	phase?: 'mount' | 'update' | 'nested-update'
	/// React's estimated no-memoization render time for the subtree (ms) — `trigger: 'react'` only.
	baseDuration?: number
	/// When React committed this update (`performance.now()`-based) — `trigger: 'react'` only.
	commitTime?: number
	/// The component's display name — `trigger: 'react'` only (also mirrored into `nodeType`).
	componentName?: string
}

/// One delivery to the consumer's `onProfile` callback.  The main synchronous walk
/// emits one batch (`trigger: 'render'`); each lazily-invoked render-producing
/// callback (a render-prop / function-child a host component calls after the walk
/// returns) emits its own batch (`trigger: 'callback'`).  When `profileReactRender` is
/// enabled, React's own commit-phase timings for the produced custom components are
/// delivered as a `trigger: 'react'` batch (built from `React.Profiler.onRender`).
/// Every batch from the same React render pass shares a `cycleId`, so callback and
/// react batches can be joined back to the render that produced them.
export interface ProfileData {
	/// The `fileName` prop, when supplied.
	fileName?: string
	/// Shared by every batch from one React render pass — the join key.
	cycleId: string
	/// The `cycleId` of the enclosing `JsxParser`'s render that produced this one (auto-propagated via
	/// context), or `null` for a root/top-level parser.  A page's main template and each nested
	/// template fragment is a separate `JsxParser`; follow `parentCycleId` from a root `cycleId` to
	/// group all renders of one page render together.
	parentCycleId: string | null
	/// Monotonic per-batch id (increments for the main pass and each callback).
	renderId: number
	/// Whether this batch is the main synchronous walk (`'render'`), a lazy callback
	/// invocation (`'callback'`), or React's commit-phase component timings (`'react'`).
	trigger: 'render' | 'callback' | 'react'
	/// The clock value (`performance.now()`-based) when this batch's work began — the walk start for
	/// `'render'`/`'callback'`, or the earliest component render start for `'react'`.  Subtract from a
	/// node's `startTime` for a batch-relative offset.
	startTime: number
	/// Milliseconds for this batch: the synchronous walk for `'render'`/`'callback'`, or the
	/// summed inclusive React render time of the root components for `'react'`.
	totalTime: number
	/// The node timings, in post-order.
	nodes: ProfilerNodeTiming[]
	/// Present only when `trigger === 'callback'`: attributes the batch to the
	/// render-prop/function-child that produced it.
	callback?: {
		/// The originating function's position within the consumer's source.
		location: SourceLocation
		/// The originating function's source text, with lines after the first de-indented
		/// (their common leading whitespace removed) — see `ProfilerNodeTiming.source`.
		source: string
		/// Which host invocation drove this call (`0`, `1`, `2`, …).
		loopIndex: number | undefined
	}
}

/// A single node's live timing frame while it is on the profiler's stack.
interface ProfilerFrame {
	id: number
	parentId: number | null
	depth: number
	start: number
	/// Accumulated inclusive time of direct children, subtracted to yield `selfTime` on exit.
	childTime: number
}

/// Collects per-node timings for one render pass.  Standard self-time bookkeeping:
/// each frame accumulates its direct children's inclusive time; on exit
/// `selfTime = elapsed - childTime` and `elapsed` is added to the parent's `childTime`.
///
/// A single session instance is reused across a render and its lazy callbacks: each
/// batch is bracketed by `begin()`/`end()`.  `begin()` allocates a fresh `nodes`
/// array so a batch already delivered to `onProfile` is never mutated by a later one.
/// The `active` flag marks "a batch is currently open" — the parser uses it to tell
/// an in-progress walk (record into it) from a lazy re-entry (start a new batch).
///
/// Owns its `performance.now()` clock (via `now()`) so tests can supply a mock.
export class ProfilerSession {
	active = false
	#renderId = 0
	#nodes: ProfilerNodeTiming[] = []
	#stack: ProfilerFrame[] = []
	#idCounter = 0
	#now: () => number

	constructor(now: () => number = () => performance.now()) {
		this.#now = now
	}

	/// The session's clock — the sole time source, so tests can mock it.
	now(): number {
		return this.#now()
	}

	/// Bumps and returns the shared monotonic batch id.  Used by `begin()` for walk batches and
	/// directly for `'react'` batches (which do not open a walk) so all batch ids stay unique.
	nextRenderId(): number {
		this.#renderId += 1
		return this.#renderId
	}

	/// Opens a batch: bumps `renderId`, resets the frame stack and id counter, and
	/// allocates a fresh `nodes` array (leaving any previously delivered batch intact).
	begin(): void {
		this.nextRenderId()
		this.#nodes = []
		this.#stack = []
		this.#idCounter = 0
		this.active = true
	}

	/// Pushes a frame for a node about to be evaluated, returning its handle for `exit`.
	enter(): ProfilerFrame {
		const parent = this.#stack.length ? this.#stack[this.#stack.length - 1] : null
		const frame: ProfilerFrame = {
			id: this.#idCounter,
			parentId: parent ? parent.id : null,
			depth: this.#stack.length,
			start: this.#now(),
			childTime: 0,
		}
		this.#idCounter += 1
		this.#stack.push(frame)
		return frame
	}

	/// Closes a frame: records its self/total time and rolls its inclusive time up
	/// into the parent's `childTime`.  Pushes the completed timing onto `nodes`.
	exit(frame: ProfilerFrame, meta: {
		nodeType: string,
		source: string,
		location: SourceLocation,
		loopIndex: number | undefined,
	}): void {
		const elapsed = this.#now() - frame.start
		this.#stack.pop()
		const parent = this.#stack.length ? this.#stack[this.#stack.length - 1] : null
		if (parent) parent.childTime += elapsed
		this.#nodes.push({
			id: frame.id,
			parentId: frame.parentId,
			depth: frame.depth,
			nodeType: meta.nodeType,
			source: meta.source,
			location: meta.location,
			startTime: frame.start,
			selfTime: elapsed - frame.childTime,
			totalTime: elapsed,
			loopIndex: meta.loopIndex,
		})
	}

	/// Closes the batch and returns its id + collected nodes for emission.
	end(): { renderId: number, nodes: ProfilerNodeTiming[] } {
		this.active = false
		return { renderId: this.#renderId, nodes: this.#nodes }
	}
}
