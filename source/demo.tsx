/* eslint-disable no-console, react/require-default-props, react/no-array-index-key */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import JsxParser, { ProfileData, ProfilerNodeTiming } from './index'

// A custom component that receives a render-prop and invokes it *lazily* — during its own render,
// after the JsxParser walk that built the prop has already returned.  Each invocation therefore
// produces its own `trigger: 'callback'` profiling batch.
const Cards = ({ items = [], renderCard }: {
	items?: Array<{ name: string, score: number }>,
	renderCard?: (item: { name: string, score: number }, index: number) => React.ReactNode,
}) => (
	<div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
		{items.map((item, index) => (
			<div key={index} style={{ border: '1px solid #d0d0d0', borderRadius: 6, padding: '6px 10px' }}>
				{renderCard?.(item, index)}
			</div>
		))}
	</div>
)

// A richer template than a static demo: nested elements, an interpolated expression, a `.map()`
// over data, and a custom component invoked with a lazy render-prop.  No leading/trailing
// whitespace, so the parser's `.trim()` leaves offsets aligned with this exact string.
const TEMPLATE = `<div className="report">
	<h1>{title}</h1>
	<p>Showing {items.length} items</p>
	<ul>
		{items.map(item => <li>{item.name} — {item.score * 2}</li>)}
	</ul>
	<Cards items={items} renderCard={item => <strong>{item.name}</strong>} />
</div>`

const DATA_A = [{ name: 'Alpha', score: 3 }, { name: 'Beta', score: 7 }, { name: 'Gamma', score: 1 }]
const DATA_B = [{ name: 'Delta', score: 9 }, { name: 'Epsilon', score: 2 }]

const ms = (n: number) => `${n.toFixed(3)}ms`
const truncate = (s: string, n = 48) => (s.length > n ? `${s.slice(0, n - 1)}…` : s).replace(/\s+/g, ' ')

// One row per node timing, indented by depth, sortable by self-time.  Clicking a row lifts its
// source range up so the template panel can highlight it.
function NodeTable({ nodes, onSelect, selected }: {
	nodes: ProfilerNodeTiming[],
	onSelect: (n: ProfilerNodeTiming) => void,
	selected: ProfilerNodeTiming | null,
}) {
	const [sortBySelf, setSortBySelf] = useState(true)
	// Post-order preserves tree shape; sorting by self-time surfaces hot spots.
	const rows = useMemo(
		() => (sortBySelf ? [...nodes].sort((a, b) => b.selfTime - a.selfTime) : nodes),
		[nodes, sortBySelf],
	)
	const th: React.CSSProperties = { textAlign: 'left', padding: '4px 8px', borderBottom: '1px solid #ccc' }
	const td: React.CSSProperties = { padding: '3px 8px', borderBottom: '1px solid #f0f0f0', whiteSpace: 'nowrap' }
	return (
		<table style={{ borderCollapse: 'collapse', fontFamily: 'monospace', fontSize: 12, width: '100%' }}>
			<thead>
				<tr>
					<th style={th}>Node</th>
					<th style={th}>Source</th>
					<th style={{ ...th, cursor: 'pointer' }} onClick={() => setSortBySelf(s => !s)}>
						self {sortBySelf ? '▼' : '·'}
					</th>
					<th style={th}>total</th>
					<th style={th}>loop</th>
				</tr>
			</thead>
			<tbody>
				{rows.map(node => (
					<tr
						key={node.id}
						onClick={() => onSelect(node)}
						style={{ cursor: 'pointer', background: selected?.id === node.id ? '#fff3b0' : 'transparent' }}
					>
						<td style={{ ...td, paddingLeft: 8 + node.depth * 14 }}>{node.nodeType}</td>
						<td style={td}>{truncate(node.source)}</td>
						<td style={td}>{ms(node.selfTime)}</td>
						<td style={td}>{ms(node.totalTime)}</td>
						<td style={td}>{node.loopIndex ?? '—'}</td>
					</tr>
				))}
			</tbody>
		</table>
	)
}

function Demo() {
	const [data, setData] = useState(DATA_A)
	const [cycle, setCycle] = useState<ProfileData[]>([])
	const [selected, setSelected] = useState<ProfilerNodeTiming | null>(null)
	// `onProfile` fires during JsxParser's render phase, so batches are buffered here (mutating a
	// ref, not setState) and published after commit by the effect below — one entry per cycleId.
	const pending = useRef<ProfileData[]>([])

	const bindings = useMemo(() => ({ title: 'Render profile demo', items: data }), [data])
	const components = useMemo(() => ({ Cards }), [])
	const handleProfile = useCallback((batch: ProfileData) => {
		if (pending.current.length && pending.current[0].cycleId !== batch.cycleId) pending.current = []
		pending.current.push(batch)
	}, [])

	// Publish the buffered cycle after each data change.  Gated on `data` (not every render) so the
	// state update it makes cannot loop back into another profiled render.
	useEffect(() => {
		if (pending.current.length) {
			setCycle(pending.current.slice())
			setSelected(null)
			pending.current = []
		}
	}, [data])

	const renderBatch = cycle.find(b => b.trigger === 'render')
	const callbackBatches = cycle.filter(b => b.trigger === 'callback')

	const highlight = (source: string) => {
		if (!selected || selected.location.startOffset === undefined || selected.location.endOffset === undefined) {
			return source
		}
		const { startOffset, endOffset } = selected.location
		return (
			<>
				{source.slice(0, startOffset)}
				<mark style={{ background: '#fff3b0' }}>{source.slice(startOffset, endOffset)}</mark>
				{source.slice(endOffset)}
			</>
		)
	}

	const panel: React.CSSProperties = { border: '1px solid #ddd', borderRadius: 8, padding: 12 }
	return (
		<div style={{ fontFamily: 'sans-serif', display: 'grid', gap: 16, gridTemplateColumns: '1fr 1fr', padding: 16 }}>
			<div style={{ gridColumn: '1 / span 2', display: 'flex', gap: 8, alignItems: 'center' }}>
				<strong>react-jsx-parser · render profiler</strong>
				<button type="button" onClick={() => setData(DATA_A)}>Data A ({DATA_A.length})</button>
				<button type="button" onClick={() => setData(DATA_B)}>Data B ({DATA_B.length})</button>
				{renderBatch && <span style={{ color: '#666' }}>cycle {renderBatch.cycleId}</span>}
			</div>

			<div style={panel}>
				<h3 style={{ marginTop: 0 }}>Rendered output</h3>
				<JsxParser
					jsx={TEMPLATE}
					bindings={bindings}
					components={components}
					onProfile={handleProfile}
					onError={console.error}
				/>
				<h3>Template source</h3>
				<pre style={{ background: '#fafafa', padding: 10, borderRadius: 6, overflowX: 'auto', fontSize: 12 }}>
					{highlight(TEMPLATE)}
				</pre>
			</div>

			<div style={panel}>
				<h3 style={{ marginTop: 0 }}>
					Render pass {renderBatch ? `· ${ms(renderBatch.totalTime)} · ${renderBatch.nodes.length} nodes` : ''}
				</h3>
				{renderBatch
					? <NodeTable nodes={renderBatch.nodes} onSelect={setSelected} selected={selected} />
					: <p style={{ color: '#888' }}>Switch data to profile a render.</p>}

				{callbackBatches.length > 0 && <h3>Lazy callbacks ({callbackBatches.length})</h3>}
				{callbackBatches.map(batch => (
					<div key={batch.renderId} style={{ marginBottom: 12 }}>
						<div style={{ fontFamily: 'monospace', fontSize: 12, color: '#555' }}>
							{truncate(batch.callback?.source ?? '')} · loop {batch.callback?.loopIndex ?? '—'} · {ms(batch.totalTime)}
						</div>
						<NodeTable nodes={batch.nodes} onSelect={setSelected} selected={selected} />
					</div>
				))}
			</div>
		</div>
	)
}

createRoot(document.querySelector('#root')!).render(<Demo />)
