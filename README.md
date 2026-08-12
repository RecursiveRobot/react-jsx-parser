# react-jsx-parser [![Version][npm-version]][npm-link] [![NPM Downloads][npm-downloads]][npm-link] [![License][npm-license]](https://github.com/recursive-robot/react-jsx-parser/blob/master/LICENSE)

[npm-version]: https://img.shields.io/npm/v/@recursive-robot/react-jsx-parser.svg
[npm-downloads]: https://img.shields.io/npm/dt/@recursive-robot/react-jsx-parser.svg
[npm-license]: https://img.shields.io/npm/l/react-jsx-parser.svg
[npm-link]: https://www.npmjs.com/package/react-jsx-parser

A React component which can parse JSX and output rendered React Components.  This is a fork of [the original package](https://github.com/TroyAlford/react-jsx-parser) with support for function declarations and modern operators.

## Installation

```
npm install @recursive-robot/react-jsx-parser
```

## Basic Usage - Injecting JSX as a String
```javascript
import React from 'react'
import JsxParser from '@recursive-robot/react-jsx-parser'
import Library from 'some-library-of-components'

class InjectableComponent extends Component {
  static defaultProps = {
    eventHandler: () => {}
  }
  // ... inner workings of InjectableComponent
}

const MyComponent = () => (
  <JsxParser
    bindings={{
      foo: 'bar',
      myEventHandler: () => { /* ... do stuff ... */ },
    }}
    components={{ InjectableComponent, Library }}
    jsx={`
      <h1>Header</h1>
      <InjectableComponent eventHandler={myEventHandler} truthyProp />
      <Library.SomeComponent someProp={foo} calc={1 + 1} stringProp="foo" />
      <Library.DataFetcher>((data) => <div>{data.name}</div>)</Library.DataFetcher>
    `}
  />
)
```

Because `InjectableComponent` is passed into the `JsxParser.props.components` prop, it is treated as a known element
type, and created using `React.createElement(...)` when parsed out of the JSX. You can also pass in a whole collection
of components, as shown by the `Library` binding, and then access the individual items with `LibraryName.ComponentName`.

Finally, a note about property bindings. The `JsxParser` can handle several types of binding:
 - implicit `true` bindings, such as `<InjectableComponent truthyProp />` (equivalent to `truthyProp={true}`)
 - string-value binding, such as `stringProp="foo"`
 - expression-binding, such as `calc={1 + 1}`
 - named-value binding, such as `eventHandler={myEventHandler}` (note that this requires a match in `bindings`)
 - [single statement arrow expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#basic_syntax), such as `(item) => <p>{item.name}</p>`
 - [multi-statement arrow functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions#function_body), such as `(item) => { const { name } = item; return <p>{name}</p>; }`

This component also supports inline arrow function declarations (both expression-bodied and block-bodied), such as:
 - `onClick={() => showToastNotification("Button clicked!") }`
 - `onClick={() => { this.showToastNotification("Button clicked!); }}` (parser bindings and local scope are bound to the function execution context)

## Advanced Usage - Injecting Dynamic JSX
```javascript
// Import desired set of components
import { ComponentA, ComponentB } from 'somePackage/Components'
import ComponentC from 'somePackage/ComponentC'
import ComponentD from 'somePackage/ComponentD'
...
// Load an HTML or XML fragment from a remote API
const dynamicHtml = loadRemoteData()
...
// Within your component's render method, bind these components and the fragment as props
<JsxParser
  bindings={bindings}
  components={{ ComponentA, ComponentB, ComponentC, ComponentD }}
  jsx={dynamicHtml}
/>
```

Any `ComponentA`, `ComponentB`, `ComponentC` or `ComponentD` tags in the dynamically loaded XML/HTML fragment will be rendered as React components. Any unrecognized tags will be handled by `React`.

_Note:_ Non-standard tags may throw errors and warnings, but will typically be rendered in a reasonable way.

## Advanced Usage - HTML & Self-Closing Tags
When rendering HTML, standards-adherent editors will render `img`, `hr`, `br`, and other
[void elements](https://www.w3.org/TR/2011/WD-html-markup-20110113/syntax.html#void-elements) with no trailing `/>`. While this is valid HTML, it is _not_ valid JSX. If you wish to opt-in to a more HTML-like parsing style, set the `autoCloseVoidElements` prop to `true`.

### Example:
```jsx
// <hr> has no closing tag, which is valid HTML, but not valid JSX
<JsxParser jsx="<hr><div className='foo'>Foo</div>" />
// Renders: null

// <hr></hr> is invalid HTML, but valid JSX
<JsxParser jsx="<hr></hr><div className='foo'>Foo</div>" />
// Renders: <hr><div class='foo'>Foo</div>

// This is valid HTML, and the `autoCloseVoidElements` prop allows it to render
<JsxParser autoCloseVoidElements jsx="<hr><div className='foo'>Foo</div>" />
// Renders: <hr><div class='foo'>Foo</div>

// This would work in a browser, but will no longer parse with `autoCloseVoidElements`
<JsxParser autoCloseVoidElements jsx="<hr></hr><div className='foo'>Foo</div>" />
// Renders: null
```

## PropTypes / Settings
```javascript
JsxParser.defaultProps = {
  allowUnknownElements: true, // by default, allow unrecognized elements
  // if false, unrecognized elements like <foo> are omitted and reported via onError

  autoCloseVoidElements: false, // by default, unclosed void elements will not parse. See examples

  bindings: {}, // by default, do not add any additional bindings

  blacklistedAttrs: [/^on.+/i], // default: removes `on*` attributes (onClick, onChange, etc.)
  // any attribute name which matches any of these RegExps will be omitted entirely

  blacklistedTags:  ['script'], // by default, removes all <script> tags

  className: '', // space-delimited classes to add to wrapper (ignored if renderInWrapper=false)

  components: {}, // an object map of component tag-names to their definitions - see above
  // components must extend React.Component, React.PureComponent, or be a Function

  componentsOnly: false, // non-component HTML tags are allowed by default, omitted if true

  disableFragments: false, // if true, React <Fragment />s will not be used.
  // Note: This introduces subtle errors with regard to white-space, and is provided only for
  // backward compatibility with React 15.x

  disableKeyGeneration: false, // if true, rendering will not automatically generate `key` props.
  // Note: This may result in the "Child elements should have a unique 'key' prop " React error.
  // Generated keys are deterministic (derived from the element's source position plus a
  // per-render occurrence count), so they are stable across re-renders: React updates rendered
  // children in place rather than remounting them, and `React.memo` children with stable props
  // (e.g. inline function props, which the parser also keeps reference-stable) can skip
  // re-renders entirely. Like index keys, occurrence-based keys are positional within a render.

  jsx: '', // the jsx string to be parsed & rendered

  onError: () => {}, // if specified, any rendering errors are reported via this method

  onProfile: undefined, // if specified, enables per-node render profiling - see "Profiling" below

  profileReactRender: false, // if true (with onProfile), also profiles React's per-component render - see "Profiling"

  renderError: undefined, // if specified, this function can be used to render errors as a fallback

  renderInWrapper: true, // if false, the HTML output will have no <div> wrapper

  renderUnrecognized: tagName => null, // unrecognized tags are rendered via this method
}
```

## Profiling

Supplying an `onProfile` callback turns on **opt-in render profiling** (presence-based, like
`onError`). It records the time spent evaluating and building each AST node — expressions,
elements, attributes, children — keyed by their position in your source, so you can find which
part of a template is expensive. When `onProfile` is omitted the standard render path is
completely unaffected (no timers, no allocations).

`onProfile` is called **once per synchronous walk**, plus **once more for each lazily-invoked
render-producing callback** — a render-prop or function-as-children that a host component invokes
after the parser's own walk has returned (e.g. `<List renderRow={row => <b>{row}</b>} />`).
Callbacks that build no elements (a plain event handler doing `setState`) emit nothing.

Every batch produced by the same React render pass shares a `cycleId`, so the main walk and its
lazy callbacks can be joined back together. `cycleId` (shared per render cycle) is distinct from
`renderId` (monotonic per batch).

```typescript
interface ProfileData {
  fileName?: string
  cycleId: string          // shared by every batch from one React render pass - the join key
  renderId: number         // monotonic per batch (the main walk + each callback)
  trigger: 'render' | 'callback' | 'react'
  startTime: number        // when this batch's work began (performance.now-based; see note below)
  totalTime: number        // ms for this batch's synchronous walk ('react': summed root render time)
  nodes: ProfilerNodeTiming[]  // post-order
  callback?: {             // present only when trigger === 'callback'
    location: SourceLocation // the render-prop/function-child's position in your source
    source: string           // its raw source text
    loopIndex: number | undefined // which host invocation (0, 1, 2 ...) drove this call
  }
}

interface ProfilerNodeTiming {
  id: number               // unique within the batch
  parentId: number | null  // enclosing node's id - lets you rebuild the tree
  depth: number
  nodeType: string         // AST node type, e.g. 'JSXElement', 'CallExpression'
  source: string           // raw node text
  location: SourceLocation // { line, column, startOffset, endOffset } in your source
  startTime: number        // when this node's work began (performance.now-based; see note below)
  selfTime: number         // ms exclusive (this node minus its children)
  totalTime: number        // ms inclusive (node + subtree)
  loopIndex: number | undefined // the .map()/iteration index that produced this node
  // Present only on trigger: 'react' nodes:
  phase?: 'mount' | 'update' | 'nested-update' // the React commit phase
  baseDuration?: number    // React's estimated no-memoization render time (ms)
  commitTime?: number      // when React committed this update (performance.now-based)
  componentName?: string   // the component's display name (also mirrored into nodeType)
}
```

All timestamps (`startTime`, `commitTime`) are [`performance.now()`](https://developer.mozilla.org/en-US/docs/Web/API/Performance/now)-based
and therefore share one time origin — so nodes and batches can be ordered on a single timeline, and
parser timings line up against React's own Profiler times. Timestamps are absolute; for a
batch-relative offset use `node.startTime - batch.startTime`.

`ProfileData` and `ProfilerNodeTiming` are exported from the package. See `source/demo.tsx` for a
worked drill-down visualizer (a sortable tree table with source-range highlighting).

### Profiling React component render times

The batches above measure how long the **parser** takes to evaluate the template and build elements.
To also measure how long **React itself** takes to render the produced components, set
`profileReactRender` (in addition to `onProfile`). **Every rendered element** — host tags (`<div>`,
`<li>`, …), custom components, and fragments — is wrapped in a transparent
[`React.Profiler`](https://react.dev/reference/react/Profiler),
and its commit-phase timings are delivered as an extra batch with `trigger: 'react'`, sharing the
render's `cycleId`. Each node carries React's `phase`, inclusive `totalTime` (React's
`actualDuration`), exclusive `selfTime`, and `baseDuration`. A `'react'` batch is emitted **per React
commit**, so one render cycle may produce several (a mount plus any update/nested-update commits),
each sharing the `cycleId` and each with a non-negative per-commit `selfTime`.

Two caveats:
- **Dev / profiling builds only.** `React.Profiler` reports nothing in a plain production React
  build; use a development or `react-dom/profiling` build. React-render profiling is a diagnostic aid.
- **Opt-in because it modifies the tree.** Wrapping components in `Profiler` changes the element
  tree, so it is off by default and gated behind `profileReactRender` — using `onProfile` alone never
  changes what is rendered. `'react'` batches arrive on a microtask after commit (later than the
  synchronous `'render'`/`'callback'` batches of the same `cycleId`), and a lazily-invoked
  render-prop's components appear as roots of their own `'react'` batch.

Every batch also carries `parentCycleId` — the `cycleId` of the enclosing `JsxParser`'s render that
produced it, or `null` at the root. When templates nest — a main template rendering fragment templates
that are themselves `JsxParser` instances — it is propagated automatically through an internal context
(via a stable holder, so it never forces a re-render), so a consumer can follow `parentCycleId` from a
root `cycleId` to correlate a page's main + sub-template renders with no wiring.

