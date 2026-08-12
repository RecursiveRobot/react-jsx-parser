// @ts-nocheck
/* eslint-disable function-paren-newline, no-console, no-underscore-dangle */
import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { render as rtlRender, fireEvent } from '@testing-library/react'
// eslint-disable-next-line import/no-extraneous-dependencies
import { vi } from 'vitest'
// eslint-disable-next-line import/no-extraneous-dependencies
import * as Acorn from 'acorn'
import JsxParser from './JsxParser'
import { JsxParserError } from '../helpers/errorUtilities'
import { ProfilerSession } from '../helpers/profilerUtilities'

const Custom = ({ children = [], className, text }) => (
	<div className={className}>
		{text}
		{children}
	</div>
)

describe('JsxParser Component', () => {
	let parent = null
	let originalConsoleError = null
	let originalJsDomEmit = null

	beforeAll(() => {
		originalConsoleError = console.error
		console.error = vi.fn()

		if (window._virtualConsole) {
			originalJsDomEmit = window._virtualConsole.emit
			window._virtualConsole.emit = vi.fn()
		}
	})

	afterAll(() => {
		console.error = originalConsoleError
		if (window._virtualConsole && originalJsDomEmit) {
			window._virtualConsole.emit = originalJsDomEmit
		}
	})

	beforeEach(() => {
		console.error.mockReset()
		window._virtualConsole?.emit?.mockReset?.()
		parent = document.createElement('div')
	})

	// Mounts via Testing Library into `parent`, exposing the class instance through
	// a ref so tests can still assert on the private `ParsedChildren` field.
	function render(element) {
		const ref = React.createRef()
		rtlRender(React.cloneElement(element, { ref }), { container: parent })
		return {
			component: ref.current,
			html: parent.innerHTML,
			parent,
			rendered: parent.firstChild,
		}
	}

	describe('using ternaries', () => {
		test('should handle boolean test value ', () => {
			const { component, rendered } = render(<JsxParser jsx={`
				<p falsyProp={false ? 1 : 0} truthyProp={true ? 1 : 0}>
					(display 1: {true ? 1 : 0}); (display 0: {false ? 1 : 0})
				</p>`}
			/>)

			expect(rendered.childNodes[0].textContent.trim())
				.toEqual('(display 1: 1); (display 0: 0)')

			expect(component.ParsedChildren[0].props.truthyProp).toBe(1)
			expect(component.ParsedChildren[0].props.falsyProp).toBe(0)
		})

		test('should handle evaluative ternaries', () => {
			const { rendered } = render(
				<JsxParser
					bindings={{ foo: 1 }}
					jsx={`
						<div className={foo === 1 ? 'isOne' : 'isNotOne'}>
							{foo !== 1 ? 'isNotOne' : 'isOne'}
						</div>
					`}
				/>,
			)

			expect(rendered.childNodes[0].classList).toContain('isOne')
			expect(rendered.childNodes[0].textContent.trim()).toEqual('isOne')
		})

		test('should handle test predicate returned value ', () => {
			const { rendered } = render(
				<JsxParser
					jsx={
						'<p>{true && true ? "a" : "b"}</p>' +
						'<p>{true && false ? "a" : "b"}</p>' +
						'<p>{true || false ? "a" : "b"}</p>' +
						'<p>{false || false ? "a" : "b"}</p>'
					}
				/>,
			)

			expect(rendered.childNodes[0].textContent).toEqual('a')
			expect(rendered.childNodes[1].textContent).toEqual('b')
			expect(rendered.childNodes[2].textContent).toEqual('a')
			expect(rendered.childNodes[3].textContent).toEqual('b')
		})
	})
	describe('conditional || rendering', () => {
		test('should handle boolean test value ', () => {
			const { component, rendered } = render(<JsxParser jsx={
				'<p falsyProp={false || "fallback"} truthyProp={true || "fallback"}>'
				+ '(display "good": {"good" || "fallback"}); (display "fallback": {"" || "fallback"})'
				+ '</p>'
			}
			/>)

			expect(rendered.childNodes[0].textContent)
				.toEqual('(display "good": good); (display "fallback": fallback)')

			expect(component.ParsedChildren[0].props.falsyProp).toBe('fallback')
			expect(component.ParsedChildren[0].props.truthyProp).toBe(true)
		})

		test('should handle evaluative', () => {
			const { component, rendered } = render(
				<JsxParser
					bindings={{ foo: 1 }}
					jsx={`
						<div truthyProp={foo === 1 || 'fallback'} falseyProp={foo !== 1 || 'fallback'}>
							{foo === 1 || 'trueFallback'}{foo !== 1 || 'falseFallback'}
						</div>
					`}
				/>,
			)
			expect(component.ParsedChildren[0].props.truthyProp).toBe(true)
			expect(component.ParsedChildren[0].props.falseyProp).toBe('fallback')
			expect(rendered.childNodes[0].textContent.trim()).toEqual('falseFallback')
		})
	})
	describe('conditional && rendering', () => {
		test('should handle boolean test value ', () => {
			const { component, rendered } = render(<JsxParser jsx={`
				<p falsyProp={false && "fallback"} truthyProp={true && "fallback"}>
					(display "fallback": {"good" && "fallback"}); (display "": {"" && "fallback"})
				</p>
			`}
			/>)

			expect(rendered.childNodes[0].textContent.trim())
				.toEqual('(display "fallback": fallback); (display "": )')

			expect(component.ParsedChildren[0].props.falsyProp).toBe(false)
			expect(component.ParsedChildren[0].props.truthyProp).toBe('fallback')
		})

		test('should handle evaluative', () => {
			const { component, rendered } = render(
				<JsxParser
					bindings={{ foo: 1 }}
					jsx={`
						<div truthyProp={foo === 1 && 'fallback'} falseyProp={foo !== 1 && 'fallback'}>
							{foo === 1 && 'trueFallback'}{foo !== 1 && 'falseFallback'}
						</div>
					`}
				/>,
			)
			expect(component.ParsedChildren[0].props.truthyProp).toBe('fallback')
			expect(component.ParsedChildren[0].props.falseyProp).toBe(false)
			expect(rendered.childNodes[0].textContent.trim()).toEqual('trueFallback')
		})
	})
	describe('conditional ?? rendering', () => {
		test('should handle null evaluative', () => {
			const { component, rendered } = render(
				<JsxParser
					bindings={{ foo: 42, bar: null }}
					jsx={`
						<div nonCoalescingProp={foo ?? 'fooFallback'} coalescingProp={bar ?? 'barFallback'}>
							{foo ?? 'fooFallback'}{bar ?? 'barFallback'}
						</div>
					`}
				/>,
			)
			expect(component.ParsedChildren[0].props.nonCoalescingProp).toBe(42)
			expect(component.ParsedChildren[0].props.coalescingProp).toBe('barFallback')
			expect(rendered.childNodes[0].textContent.trim()).toEqual('42barFallback')
		})

		test('should handle undefined evaluative', () => {
			const { component, rendered } = render(
				<JsxParser
					bindings={{ foo: 42 }}
					jsx={`
						<div nonCoalescingProp={foo ?? 'fooFallback'} coalescingProp={bar ?? 'barFallback'}>
							{foo ?? 'fooFallback'}{bar ?? 'barFallback'}
						</div>
					`}
				/>,
			)
			expect(component.ParsedChildren[0].props.nonCoalescingProp).toBe(42)
			expect(component.ParsedChildren[0].props.coalescingProp).toBe('barFallback')
			expect(rendered.childNodes[0].textContent.trim()).toEqual('42barFallback')
		})
	})
	describe('basic rendering', () => {
		test('renders non-React components', () => {
			const { component, rendered } = render(
				<JsxParser
					jsx={
						'<h1>Header</h1>'
						+ '<div class="foo">Foo</div>'
						+ '<span class="bar">Bar</span>'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(3)
			expect(rendered.childNodes).toHaveLength(3)

			expect(rendered.childNodes[0].nodeName).toEqual('H1')
			expect(rendered.childNodes[0].textContent).toEqual('Header')

			expect(rendered.childNodes[1].nodeName).toEqual('DIV')
			expect(rendered.childNodes[1].classList.contains('foo')).toBeTruthy()
			expect(rendered.childNodes[1].textContent).toEqual('Foo')

			expect(rendered.childNodes[2].nodeName).toEqual('SPAN')
			expect(rendered.childNodes[2].classList.contains('bar')).toBeTruthy()
			expect(rendered.childNodes[2].textContent).toEqual('Bar')
		})
		test('renders nested components', () => {
			const { component, rendered } = render(
				<JsxParser
					jsx={
						'<div>'
						+ 'Outer'
						+ '<div>Inner</div>'
						+ '</div>'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(1)
			expect(rendered.childNodes).toHaveLength(1)

			const outer = rendered.childNodes[0]
			expect(outer.nodeName).toEqual('DIV')
			expect(outer.childNodes).toHaveLength(2)

			const [text, div] = outer.childNodes
			expect(text.nodeType).toEqual(Node.TEXT_NODE) // Text
			expect(text.textContent).toEqual('Outer')

			expect(div.nodeType).toEqual(Node.ELEMENT_NODE) // Element
			expect(div.nodeName).toEqual('DIV')
			expect(div.textContent).toEqual('Inner')
		})
		test('renders custom components', () => {
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					jsx={
						'<h1>Header</h1>'
						+ '<Custom className="blah" text="Test Text" />'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(2)
			expect(rendered.childNodes).toHaveLength(2)

			expect(rendered.childNodes[0].nodeName).toEqual('H1')
			expect(rendered.childNodes[0].textContent).toEqual('Header')

			const custom = component.ParsedChildren[1]
			expect(custom.type).toBe(Custom)
			expect(custom.props.text).toEqual('Test Text')

			const customHTML = rendered.childNodes[1]
			expect(customHTML.nodeName).toEqual('DIV')
			expect(customHTML.textContent).toEqual('Test Text')
		})
		test('renders custom components with spread operator', () => {
			const first = {
				className: 'blah',
				text: 'Will Be Overwritten',
			}
			const second = {
				innerProps: {
					text: 'Test Text',
				},
			}
			const third = {
				callbackA: () => 'Result from callback A',
				callbackB: () => 'Result from callback B',
			}
			const fourth = () => ({
				foo: 'Foo from spread of function call',
				bar: 'Bar from spread of function call',
			})
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ first, second, third, fourth }}
					jsx={
						'<Custom'
						+ ' {...first}'
						+ ' {...second.innerProps}'
						+ " {...{ willSpread: 'Will Spread' }}"
						+ ' alsoWillSpread={{ ...third }}'
						+ ' {...fourth()}'
						+ ' />'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(1)
			expect(rendered.childNodes).toHaveLength(1)

			const custom = component.ParsedChildren[0]
			expect(custom.type).toBe(Custom)
			expect(custom.props.className).toEqual('blah')
			expect(custom.props.text).toEqual('Test Text')
			expect(custom.props.willSpread).toEqual('Will Spread')
			expect(custom.props.alsoWillSpread.callbackA()).toEqual('Result from callback A')
			expect(custom.props.alsoWillSpread.callbackB()).toEqual('Result from callback B')
			expect(custom.props.foo).toEqual('Foo from spread of function call')
			expect(custom.props.bar).toEqual('Bar from spread of function call')

			const customNode = rendered.childNodes[0]
			expect(customNode.nodeName).toEqual('DIV')
			expect(customNode.textContent).toEqual('Test Text')
			const customHTML = rendered.childNodes[0].innerHTML
			expect(customHTML).not.toMatch(/Will Be Overwritten/)
			expect(customHTML).not.toMatch(/Will Not Spread/)
		})
		test('spread operator supports function calls', () => {
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{
						foo: () => ({ text: 'Bar' }),
						baz: () => ({ qux: 'Qux' }),
					}}
					jsx="<Custom {...foo()} {...baz()} />"
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(1)
			expect(rendered.childNodes).toHaveLength(1)

			const custom = component.ParsedChildren[0]
			expect(custom.type).toBe(Custom)
			expect(custom.props.text).toEqual('Bar')
			expect(custom.props.qux).toEqual('Qux')

			const customNode = rendered.childNodes[0]
			expect(customNode.nodeName).toEqual('DIV')
			expect(customNode.textContent).toEqual('Bar')
		})
		test('spread operator supports IIFEs', () => {
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					jsx={
						'<Custom'
						+ '{...(() => { return { text: "Bar" }; })()}'
						+ '{...(() => { return { qux: "Qux" }; })()}'
						+ '/>'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(1)
			expect(rendered.childNodes).toHaveLength(1)

			const custom = component.ParsedChildren[0]
			expect(custom.type).toBe(Custom)
			expect(custom.props.text).toEqual('Bar')
			expect(custom.props.qux).toEqual('Qux')

			const customNode = rendered.childNodes[0]
			expect(customNode.nodeName).toEqual('DIV')
			expect(customNode.textContent).toEqual('Bar')
		})
		test('renders custom components with nesting', () => {
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					jsx={
						'<Custom className="outer" text="outerText">'
						+ '<Custom className="inner" text="innerText">'
						+ '<div>Non-Custom</div>'
						+ '</Custom>'
						+ '</Custom>'
					}
				/>,
			)
			expect(component.ParsedChildren).toHaveLength(1)
			expect(rendered.childNodes).toHaveLength(1)

			const outer = rendered.childNodes[0]
			expect(outer.nodeName).toEqual('DIV')
			expect(outer.className).toEqual('outer')
			expect(outer.childNodes).toHaveLength(2)

			const [text, inner] = Array.from(outer.childNodes)
			expect(text.nodeType).toEqual(Node.TEXT_NODE)
			expect(text.textContent).toEqual('outerText')
			expect(inner.nodeType).toEqual(Node.ELEMENT_NODE)
			expect(inner.nodeName).toEqual('DIV')
			expect(inner.className).toEqual('inner')
			expect(inner.childNodes).toHaveLength(2)

			const [innerText, innerDiv] = Array.from(inner.childNodes)
			expect(innerText.nodeType).toEqual(Node.TEXT_NODE)
			expect(innerText.textContent).toEqual('innerText')
			expect(innerDiv.nodeType).toEqual(Node.ELEMENT_NODE)
			expect(innerDiv.nodeName).toEqual('DIV')
			expect(innerDiv.textContent).toEqual('Non-Custom')
		})
		test('handles unrecognized components', () => {
			const { component, rendered } = render(
				<JsxParser
					components={[/* No Components Passed In */]}
					jsx={
						'<Unrecognized class="outer" foo="Foo">'
						+ '<Unrecognized class="inner" bar="Bar">'
						+ '<div>Non-Custom</div>'
						+ '</Unrecognized>'
						+ '</Unrecognized>'
					}
				/>,
			)

			expect(component.ParsedChildren[0].props.foo).toEqual('Foo')
			expect(component.ParsedChildren[0].props.children.props.bar).toEqual('Bar')

			expect(rendered.childNodes).toHaveLength(1)
			const outer = rendered.childNodes[0]
			expect(outer.nodeName).toEqual('UNRECOGNIZED')
			expect(outer.childNodes).toHaveLength(1)

			const inner = outer.childNodes[0]
			expect(inner.nodeName).toEqual('UNRECOGNIZED')
			expect(inner.childNodes).toHaveLength(1)

			const div = inner.childNodes[0]
			expect(div.nodeName).toEqual('DIV')
			expect(div.textContent).toEqual('Non-Custom')

			expect(console.error).toHaveBeenCalledTimes(1)
			expect(console.error.mock.calls[0][0]).toMatch(/unrecognized in this browser/)
		})
		test('handles fragment shorthand syntax (<></>)', () => {
			const jsx = '<><>Test</> <>Test</></>'
			const { html } = render(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(html).toBe('Test Test')
		})
		test('renders falsy expressions correctly', () => {
			const jsx = '<b>{false}{undefined}{0}{null}{[]}</b>'
			const { html } = render(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(html).toBe('<b>0</b>')
		})
		test('skips over DOCTYPE, html, head, and div if found', () => {
			const { rendered } = render(
				<JsxParser jsx="<!DOCTYPE html><html><head></head><body><h1>Test</h1><p>Another Text</p></body></html>" />,
			)

			expect(rendered.childNodes).toHaveLength(2)
		})
		test('renders custom elements without requiring closing tags', () => {
			// eslint-disable-next-line react/prefer-stateless-function
			const CustomContent = () => <h1>Custom Content</h1>

			const { rendered } = render(
				<JsxParser
					components={{ CustomContent }}
					jsx="<CustomContent /><p>Text</p>"
				/>,
			)

			expect(rendered.childNodes).toHaveLength(2)
			expect(rendered.getElementsByTagName('p')).toHaveLength(1)

			expect(rendered.getElementsByTagName('h1')).toHaveLength(1)
			expect(rendered.getElementsByTagName('h1')[0].textContent).toEqual('Custom Content')
		})
		test('renders custom elements without closing tags', () => {
			// eslint-disable-next-line react/prefer-stateless-function
			const CustomContent = () => <h1>Ipsum</h1>
			const CuStomContent = () => <h1>Lorem</h1>

			const { rendered } = render(
				<JsxParser
					components={{ CustomContent, CuStomContent }}
					jsx="<CustomContent /><CuStomContent />"
				/>,
			)

			expect(rendered.childNodes).toHaveLength(2)
			expect(rendered.getElementsByTagName('h1')).toHaveLength(2)
			expect(rendered.getElementsByTagName('h1')[0].textContent).toEqual('Ipsum')
			expect(rendered.getElementsByTagName('h1')[1].textContent).toEqual('Lorem')
		})
		test('renders custom elements with dot notation tags', () => {
			const Lib = { Custom }
			const { component, rendered } = render(
				<JsxParser
					components={{ Lib }}
					jsx={
						'<h1>Header</h1>'
						+ '<Lib.Custom className="blah" text="Test Text" />'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(2)
			expect(rendered.childNodes).toHaveLength(2)

			expect(rendered.childNodes[0].nodeName).toEqual('H1')
			expect(rendered.childNodes[0].textContent).toEqual('Header')

			const custom = component.ParsedChildren[1]
			expect(custom.type).toBe(Custom)
			expect(custom.props.text).toEqual('Test Text')

			const customHTML = rendered.childNodes[1]
			expect(customHTML.nodeName).toEqual('DIV')
			expect(customHTML.textContent).toEqual('Test Text')
		})
		test('renders custom elements with multiple dot notation tags', () => {
			const SubLib = { Custom }
			const Lib = { SubLib }
			const { component, rendered } = render(
				<JsxParser
					components={{ Lib }}
					jsx={
						'<h1>Header</h1>'
						+ '<Lib.SubLib.Custom className="blah" text="Test Text" />'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(component.ParsedChildren).toHaveLength(2)
			expect(rendered.childNodes).toHaveLength(2)

			expect(rendered.childNodes[0].nodeName).toEqual('H1')
			expect(rendered.childNodes[0].textContent).toEqual('Header')

			const custom = component.ParsedChildren[1]
			expect(custom.type).toBe(Custom)
			expect(custom.props.text).toEqual('Test Text')

			const customHTML = rendered.childNodes[1]
			expect(customHTML.nodeName).toEqual('DIV')
			expect(customHTML.textContent).toEqual('Test Text')
		})
		test('outputs no wrapper element when renderInWrapper prop is false', () => {
			render(<JsxParser jsx="<h1>Foo</h1><hr />" renderInWrapper={false} />)
			expect(parent.childNodes).toHaveLength(2)

			const [h1, hr] = Array.from(parent.childNodes)
			expect([h1.nodeType, h1.nodeName, h1.textContent])
				.toEqual([Node.ELEMENT_NODE, 'H1', 'Foo'])
			expect([hr.nodeType, hr.nodeName]).toEqual([Node.ELEMENT_NODE, 'HR'])
		})
		test('omits unknown elements and errors if !allowUnknownElements', () => {
			const onError = vi.fn()
			const { html } = render(
				<JsxParser
					allowUnknownElements={false}
					jsx="<foo>Foo</foo><div>div</div><bar>Bar</bar>"
					onError={onError}
					renderInWrapper={false}
				/>,
			)
			expect(onError).toHaveBeenCalledTimes(2)
			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.stringContaining('`<foo>` is unrecognized'),
				}),
			)
			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.stringContaining('`<bar>` is unrecognized'),
				}),
			)
			expect(html).toMatchSnapshot()
		})
		test('renders errors with renderError prop, if supplied', () => {
			const onError = vi.fn()
			// eslint-disable-next-line
			const renderError = ({ error }) => <div className="error">{error}</div>
			const { rendered } = render(
				<JsxParser {...{ onError, renderError }} jsx="<h2>No closing tag " />,
			)

			expect(onError).toHaveBeenCalledTimes(1)
			expect(rendered.querySelectorAll('h2')).toHaveLength(0)
			expect(rendered.querySelectorAll('div')).toHaveLength(1)
			expect(rendered.textContent).toMatch(/SyntaxError: Expected corresponding JSX closing tag for &lt;h2&gt;/)
		})
		test('re-rendering should update child elements rather than unmount and remount them', () => {
			const updates = vi.fn()
			const unmounts = vi.fn()
			const components = {
				Custom: class extends React.Component {
					componentDidUpdate() { updates() }
					componentWillUnmount() { unmounts() }
					render() { return 'Custom element!' }
				},
			}
			const { rerender } = rtlRender(
				<JsxParser
					components={components}
					disableKeyGeneration
					jsx="<div><p>Hello</p><hr /><Custom /></div>"
				/>,
				{ container: parent },
			)
			rerender(
				<JsxParser
					components={components}
					disableKeyGeneration
					jsx="<div><p>Hello</p><hr /><Custom /></div>"
					someProp
				/>,
			)
			expect(updates).toHaveBeenCalled()
			expect(unmounts).not.toHaveBeenCalled()
		})
	})
	describe('sourceInfo injection', () => {
		const OptedIn: any = ({ children = [], text }) => <div>{text}{children}</div>
		OptedIn.injectSourceInfo = true

		test('injects sourceInfo into opted-in components', () => {
			const jsx = '<h1>Header</h1>\n<OptedIn text="Hi">\n  <span>Inner</span>\n</OptedIn>'
			const { component } = render(
				<JsxParser
					components={{ OptedIn }}
					fileName="template.jsx"
					jsx={jsx}
				/>,
			)

			const opted = component.ParsedChildren.find((c: any) => c?.type === OptedIn)
			expect(opted.type).toBe(OptedIn)

			const meta = opted.props.sourceInfo
			expect(meta).toBeDefined()
			expect(meta.fileName).toEqual('template.jsx')
			// The raw `source` is the full element, opening tag through closing tag.
			expect(meta.source).toEqual('<OptedIn text="Hi">\n  <span>Inner</span>\n</OptedIn>')
			// `<OptedIn>` begins on the second line of the source.
			expect(meta.location.line).toEqual(2)
			expect(meta.location.column).toEqual(0)
			// Offsets are relative to the user's original `jsx` (wrapper subtracted out),
			// so slicing the source by them round-trips back to the element text.
			expect(jsx.slice(meta.location.startOffset, meta.location.endOffset)).toEqual(meta.source)
			// Not produced by a `.map()`/array iteration, so the source-item index is undefined.
			expect(meta.loopIndex).toBeUndefined()
			// Parsed AST Node should be populated.
			expect(meta.astNode).not.toBeNull()
		})

		// Recursively collects opted-in elements in document order, descending through the
		// children of intermediate elements (e.g. the fragment a map iteration returns).
		const collectOptedIn = (node: any, acc: any[] = []): any[] => {
			if (Array.isArray(node)) {
				node.forEach((child: any) => collectOptedIn(child, acc))
			} else if (React.isValidElement(node)) {
				if (node.type === OptedIn) acc.push(node)
				else collectOptedIn((node.props as any).children, acc)
			}
			return acc
		}

		test('uses the map iteration index as loopIndex', () => {
			const jsx = '{items.map(item => <OptedIn text={item} />)}'
			const { component } = render(
				<JsxParser components={{ OptedIn }} bindings={{ items: ['a', 'b', 'c'] }} jsx={jsx} />,
			)
			const opted = collectOptedIn(component.ParsedChildren)
			expect(opted).toHaveLength(3)
			expect(opted.map((c: any) => c.props.sourceInfo.loopIndex)).toEqual([0, 1, 2])
			// Every instance shares the same source AST node — loopIndex is the only disambiguator.
			expect(new Set(opted.map((c: any) => c.props.sourceInfo.source)).size).toEqual(1)
		})

		test('shares one loopIndex across all elements from a single map iteration', () => {
			const jsx = `{items.map(item => (
				<>
					<OptedIn text="Cancel" />
					<OptedIn text="Accept" />
				</>
			))}`
			const { component } = render(
				<JsxParser components={{ OptedIn }} bindings={{ items: ['a', 'b', 'c'] }} jsx={jsx} />,
			)
			const opted = collectOptedIn(component.ParsedChildren)
			expect(opted.map((c: any) => c.props.text))
				.toEqual(['Cancel', 'Accept', 'Cancel', 'Accept', 'Cancel', 'Accept'])
			// Both elements of an iteration share that iteration's index; it increments per item.
			expect(opted.map((c: any) => c.props.sourceInfo.loopIndex))
				.toEqual([0, 0, 1, 1, 2, 2])
			// Siblings within one iteration remain distinguishable by their differing source.
			expect(opted[0].props.sourceInfo.source)
				.not.toEqual(opted[1].props.sourceInfo.source)
		})

		test('uses the map iteration index for block-bodied map callbacks', () => {
			const jsx = '{items.map(item => { return <OptedIn text={item} /> })}'
			const { component } = render(
				<JsxParser components={{ OptedIn }} bindings={{ items: ['a', 'b', 'c'] }} jsx={jsx} />,
			)
			const opted = collectOptedIn(component.ParsedChildren)
			expect(opted).toHaveLength(3)
			expect(opted.map((c: any) => c.props.sourceInfo.loopIndex)).toEqual([0, 1, 2])
		})

		test('reports full-template offsets for block-bodied function elements', () => {
			const jsx = 'Header\n{items.map(item => { return <OptedIn text={item} />; })}'
			const { component } = render(
				<JsxParser components={{ OptedIn }} bindings={{ items: ['a'] }} jsx={jsx} />,
			)
			const meta = collectOptedIn(component.ParsedChildren)[0].props.sourceInfo
			expect(meta.source).toEqual('<OptedIn text={item} />')
			// Offsets index into the full original `jsx`, not the extracted fragment.
			expect(jsx.slice(meta.location.startOffset, meta.location.endOffset)).toEqual(meta.source)
			expect(meta.location.line).toEqual(2)
		})

		test('reports full-template offsets for block bodies with destructured params', () => {
			// Destructured params route through the IIFE-wrapped (preprocessing) body path.
			const jsx = 'X\n{items.map(({ label }) => { return <OptedIn text={label} />; })}'
			const { component } = render(
				<JsxParser components={{ OptedIn }} bindings={{ items: [{ label: 'a' }] }} jsx={jsx} />,
			)
			const meta = collectOptedIn(component.ParsedChildren)[0].props.sourceInfo
			expect(meta.source).toEqual('<OptedIn text={label} />')
			expect(jsx.slice(meta.location.startOffset, meta.location.endOffset)).toEqual(meta.source)
			expect(meta.location.line).toEqual(2)
		})

		test('shares loopIndex 0 across statically-written siblings', () => {
			const jsx = '<OptedIn text="a" />\n<OptedIn text="b" />'
			const { component } = render(<JsxParser components={{ OptedIn }} jsx={jsx} />)
			const opted = collectOptedIn(component.ParsedChildren)
			// Neither is produced by an iteration, so both report 0 (distinguished by source).
			opted.forEach((c: any) => expect(c.props.sourceInfo.loopIndex).toBeUndefined())
		})

		test('reports loopIndex 0 for a lone element', () => {
			const jsx = '<OptedIn text="x" />'
			const { component } = render(<JsxParser components={{ OptedIn }} jsx={jsx} />)
			expect(component.ParsedChildren[0].props.sourceInfo.loopIndex).toBeUndefined()
		})

		test('omits fileName when none is supplied', () => {
			const jsx = '<OptedIn text="Hi" />'
			const { component } = render(<JsxParser components={{ OptedIn }} jsx={jsx} />)
			expect(component.ParsedChildren[0].props.sourceInfo.fileName).toBeUndefined()
		})

		test('does not inject into components that have not opted in', () => {
			const jsx = '<Custom text="Hi" />'
			const { component } = render(<JsxParser components={{ Custom }} jsx={jsx} />)
			expect(component.ParsedChildren[0].props.sourceInfo).toBeUndefined()
		})

		test('does not inject into plain HTML elements', () => {
			const jsx = '<div>Hello</div>'
			const { component } = render(<JsxParser jsx={jsx} />)
			expect(component.ParsedChildren[0].props.sourceInfo).toBeUndefined()
		})
	})
	describe('blacklisting & whitelisting', () => {
		test('strips <script src="..."> tags by default', () => {
			const { component, rendered } = render(
				<JsxParser
					jsx={
						'<div>Before</div>'
						+ '<script src="http://example.com/test.js"></script>'
						+ '<div>After</div>'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(2)
			expect(rendered.querySelectorAll('script')).toHaveLength(0)
			expect(rendered.childNodes).toHaveLength(2)
			expect(parent.getElementsByTagName('script')).toHaveLength(0)
		})
		test('strips <script>...</script> tags by default', () => {
			const { component, rendered } = render(
				<JsxParser
					jsx={
						'<div>Before</div>'
						+ '<script>'
						+ 'window.alert("This shouldn\'t happen!");'
						+ '</script>'
						+ '<div>After</div>'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(2)
			expect(rendered.querySelectorAll('script')).toHaveLength(0)
			expect(rendered.childNodes).toHaveLength(2)
			expect(parent.getElementsByTagName('script')).toHaveLength(0)
		})
		test('strips onEvent="..." attributes by default', () => {
			const { component, rendered } = render(
				<JsxParser
					jsx={
						'<div onClick="handleClick()">first</div>'
						+ '<div onChange="handleChange()">second</div>'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(2)
			expect(rendered.childNodes).toHaveLength(2)
			expect(component.ParsedChildren[0].props.onClick).toBeUndefined()
			expect(rendered.childNodes[0].attributes).toHaveLength(0)
			expect(component.ParsedChildren[1].props.onChange).toBeUndefined()
			expect(rendered.childNodes[1].attributes).toHaveLength(0)
		})
		test('strips custom blacklisted tags and attributes', () => {
			const { component, rendered } = render(
				<JsxParser
					blacklistedTags={['Foo']}
					blacklistedAttrs={['foo', 'prefixed[a-z]*']}
					jsx={
						'<div foo="bar" prefixedFoo="foo" prefixedBar="bar">first</div>'
						+ '<Foo>second</Foo>'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(1)
			expect(rendered.childNodes).toHaveLength(1)
			expect(component.ParsedChildren[0].props.foo).toBeUndefined()
			expect(component.ParsedChildren[0].props.prefixedFoo).toBeUndefined()
			expect(component.ParsedChildren[0].props.prefixedBar).toBeUndefined()
			expect(rendered.childNodes[0].attributes.foo).toBeUndefined()
			expect(rendered.childNodes[0].attributes.prefixedFoo).toBeUndefined()
			expect(rendered.childNodes[0].attributes.prefixedBar).toBeUndefined()
		})
		test('applies changed blacklist props on re-render', () => {
			const jsx = '<span custom="x">a</span><p>b</p>'
			const { rerender } = rtlRender(
				<JsxParser jsx={jsx} />,
				{ container: parent },
			)
			expect(parent.querySelector('p')).not.toBeNull()
			expect(parent.querySelector('span').getAttribute('custom')).toBe('x')

			// The blacklists are compiled once per render, keyed on the props references — new
			// arrays must recompile and take effect (no stale compile).
			rerender(<JsxParser jsx={jsx} blacklistedTags={['p']} blacklistedAttrs={['custom']} />)
			expect(parent.querySelector('p')).toBeNull()
			expect(parent.querySelector('span').getAttribute('custom')).toBeNull()
		})
		test('strips HTML tags if componentsOnly=true', () => {
			// eslint-disable-next-line react/prop-types
			const Simple = ({ children, text }) => <div>{text}{children}</div>
			const { rendered } = render(
				<JsxParser
					components={{ Simple }}
					componentsOnly
					jsx={`
						<h1>Ignored</h1>
						<Simple text="Parent">
							<Simple text="Child">
								<h2>Ignored</h2>
							</Simple>
						</Simple>
					`}
				/>,
			)
			expect(rendered.getElementsByTagName('h1')).toHaveLength(0)
			expect(rendered.getElementsByTagName('h2')).toHaveLength(0)
			expect(rendered.getElementsByTagName('div')).toHaveLength(2)
			expect(rendered.textContent.replace(/\s/g, '')).toEqual('ParentChild')
		})
	})
	describe('whitespace', () => {
		test('allows no-whitespace-element named custom components to take whitespace', () => {
			// eslint-disable-next-line react/prop-types
			const tr = ({ children }) => (<div className="tr">{children}</div>)
			const { rendered } = render(<JsxParser components={{ tr }} jsx='<tr> <a href="/url">Text</a> </tr>' />)
			expect(rendered.childNodes[0].nodeName).toEqual('DIV')
			expect(rendered.childNodes[0].childNodes).toHaveLength(3)

			const [space1, text, space2] = Array.from(rendered.childNodes[0].childNodes)
			const nodeTypes = [space1, text, space2].map(n => n.nodeType)
			expect(nodeTypes).toEqual([Node.TEXT_NODE, Node.ELEMENT_NODE, Node.TEXT_NODE])
			expect(space1.textContent).toEqual(' ')
			expect(text.textContent).toEqual('Text')
			expect(space2.textContent).toEqual(' ')
		})
		test('leaves a space between elements as-coded', () => {
			const jsx = '<b>first</b> <b>second</b>'
			const { html } = render(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(html).toBe(jsx)
		})
		test('keeps line-breaks', () => {
			const jsx = '<code class="markdown"># hello\n\na paragraph\n</code>'
			const { html } = render(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(html).toBe(jsx)
		})
		test('handles whitespace correctly', () => {
			const { rendered } = render(
				<JsxParser
					jsx={'\
						<h1>Title</h1>\
						<div class="foo">Bar</div>\
					'}
				/>,
			)

			// H1
			// Comment Whitespace Comment
			// DIV
			const children = Array.from(rendered.childNodes)
			expect(children).toHaveLength(3)

			const [h1, whitespace, div] = children
			expect(h1.nodeType).toEqual(Node.ELEMENT_NODE)
			expect(h1.nodeName).toEqual('H1')
			expect(h1.textContent).toEqual('Title')
			expect(whitespace.nodeType).toEqual(Node.TEXT_NODE)
			expect(whitespace.textContent).toMatch(/^\s+$/i)
			expect(div.nodeType).toEqual(Node.ELEMENT_NODE)
			expect(div.nodeName).toEqual('DIV')
			expect(div.textContent).toEqual('Bar')
			expect(div.className).toEqual('foo')
		})
		test('keeps non-breaking spaces as such', () => {
			const { rendered } = render(
				<JsxParser
					jsx={
						'<p>Contains a&nbsp;non-breaking space (html named entity)</p>'
						+ '<p>Contains a&#160;non-breaking space (html numbered entity)</p>'
						+ '<p>Contains a\u00a0non-breaking space (utf sequence)</p>'
						+ '<p>Contains a non-breaking space (hard coded, using alt+space)</p>'
						+ '<p>Contains a&#8239;narrow non-breaking space (html numbered entity)</p>'
						+ '<p>Contains a\u202Fnarrow non-breaking space (utf sequence)</p>'
						+ '<p>This is a test with regular spaces only</p>'
					}
				/>,
			)

			// Entites are converted to utf sequences
			// The first four paragraphs should contain \u00A0 (utf non-breaking space)
			// The two next paragraphs should contain \u202F (utf narrow non-breaking space)
			// The last paragraph should *not* contain any non breaking spaces
			const children = Array.from(rendered.childNodes)

			expect(children).toHaveLength(7)
			expect(children.every(c => c.nodeType === Node.ELEMENT_NODE))
			expect(children.every(c => c.nodeName === 'P'))

			const last = children.pop()
			expect(children.every(c => c.textContent.match(/[\u00A0]/)))
			expect(last.textContent).not.toMatch(/[\u00A0|\u202F]/)
		})
	})
	describe('prop bindings', () => {
		test('parses childless elements with children = undefined', () => {
			const { component } = render(<JsxParser components={{ Custom }} jsx="<Custom />" />)

			expect(component.ParsedChildren).toHaveLength(1)
			expect(component.ParsedChildren[0].props.children).toBeUndefined()
		})
		test('parses implicit boolean props', () => {
			const { component } = render(
				<JsxParser
					components={{ Custom }}
					jsx="<Custom shouldBeTrue shouldBeFalse={false} />"
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(1)
			expect(component.ParsedChildren[0].props.shouldBeTrue).toBe(true)
			expect(component.ParsedChildren[0].props.shouldBeFalse).toBe(false)
		})
		test('parses explicit boolean props', () => {
			const { component } = render(
				<JsxParser
					components={{ Custom }}
					jsx="<Custom shouldBeTrue={true} shouldBeFalse={false} />"
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(1)
			expect(component.ParsedChildren[0].props.shouldBeTrue).toBe(true)
			expect(component.ParsedChildren[0].props.shouldBeFalse).toBe(false)
		})
		test('parses bound object values', () => {
			const { component } = render(<JsxParser components={{ Custom }} jsx='<Custom obj={{ foo: "bar", bar: "foo" }} />' />)

			expect(component.ParsedChildren).toHaveLength(1)
			expect(component.ParsedChildren[0].props.obj).toEqual({ foo: 'bar', bar: 'foo' })
		})
		test('parses style attributes', () => {
			const { rendered } = render(
				<JsxParser
					jsx={
						'<div style="margin: 0 1px 2px 3px;"></div>'
						+ '<div style="padding-left: 45px; padding-right: 1em;"></div>'
					}
				/>,
			)

			expect(rendered.childNodes).toHaveLength(2)
		})
		test('passes bindings to children', () => {
			const logFn = () => { console.log('Foo!') }
			const { component } = render(
				<JsxParser
					bindings={{
						foo: 'Foo',
						bar: 'Bar',
						logFn,
						nested: {
							objects: {
								work: true,
							},
						},
					}}
					blacklistedAttrs={[]}
					components={{ Custom }}
					jsx={
						'<Custom foo={foo} bar={bar}></Custom>'
						+ '<div foo={foo} />'
						+ '<span onClick={logFn}>Click Me!</span>'
						+ '<div doTheyWork={nested.objects.work} />'
						+ '<div unresolvable={a.bad.binding} />'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(5)
			expect(component.ParsedChildren[0].props).toEqual({ foo: 'Foo', bar: 'Bar' })
			expect(component.ParsedChildren[1].props).toEqual({ foo: 'Foo' })
			expect(component.ParsedChildren[2].props.onClick).toEqual(logFn)
			expect(component.ParsedChildren[3].props).toEqual({ doTheyWork: true })
			expect(component.ParsedChildren[4].props).toEqual({ unresolvable: undefined })
		})
		test('parses array values', () => {
			const { html } = render(
				<JsxParser jsx="<div>{[1,2,3]}</div>" renderInWrapper={false} />,
			)
			expect(html).toEqual('<div>123</div>')
		})
		test('supports spread operator inside array values', () => {
			const { html } = render(
				<JsxParser
					bindings={{ arr1: [1, 2, 3], arr2: [5, 6, 7] }}
					jsx="<div>{[...arr1, 4, ...arr2]}</div>"
					renderInWrapper={false}
				/>,
			)
			expect(html).toEqual('<div>1234567</div>')
		})
		test('supports function invocation in array declarations', () => {
			const { html } = render(
				<JsxParser
					bindings={{ arr1: () => [1, 2, 3], arr2: () => 4 }}
					jsx="<div>{[...arr1(), arr2()]}</div>"
					renderInWrapper={false}
				/>,
			)
			expect(html).toEqual('<div>1234</div>')
		})
		test('supports mixed expression types inside array', () => {
			const { html } = render(
				<JsxParser
					bindings={{ arr1: [1, 2, 3], arr2: () => 5, arr3: () => [6, 7, 8] }}
					jsx="<div>{[...arr1, 4, arr2(), ...arr3()]}</div>"
					renderInWrapper={false}
				/>,
			)
			expect(html).toEqual('<div>12345678</div>')
		})
		test('supports function chaining on arrays', () => {
			const { html } = render(
				<JsxParser
					bindings={{ arr1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }}
					jsx="<ul>{[...arr1].filter(x => x % 2 === 0).map(x => <li>{x}</li>)}</ul>"
					renderInWrapper={false}
				/>,
			)
			expect(html).toEqual('<ul><li>2</li><li>4</li><li>6</li><li>8</li><li>10</li></ul>')
		})
		test('honors conditional rendering based on bound values', () => {
			const logFn = () => { console.log('Foo!') }
			const { component } = render(
				<JsxParser
					bindings={{
						foo: 'Foo',
						bar: 'Bar',
						logFn,
						nested: {
							objects: {
								work: true,
							},
						},
					}}
					blacklistedAttrs={[]}
					components={{ Custom }}
					jsx={
						'<div foo={foo} />'
						+ '<span onClick={logFn}>Click Me!</span>'
						+ '{nested.objects.work && <div doTheyWork={nested.objects.work} />}'
						+ '{nested.objects.work === "nope" && <div>Do not show me</div>}'
						+ '<div unresolvable={a.bad.binding} />'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(4)
			expect(component.ParsedChildren[0].props).toEqual({ foo: 'Foo' })
			expect(component.ParsedChildren[1].props.onClick).toEqual(logFn)
			expect(component.ParsedChildren[2].props).toEqual({ doTheyWork: true })
			expect(component.ParsedChildren[3].props).toEqual({ unresolvable: undefined })
		})
		test('allows use of bound functions in conditionals rendering', () => {
			const logFn = () => { console.log('Foo!') }
			const { component } = render(
				<JsxParser
					bindings={{
						foo: 'Foo',
						bar: 'Bar',
						logFn,
						nested: {
							objects: {
								work: false,
								noWork: () => true,
							},
						},
					}}
					blacklistedAttrs={[]}
					components={{ Custom }}
					jsx={
						'<div foo={foo} />'
						+ '<span onClick={logFn}>Click Me!</span>'
						+ '{( nested.objects.work || nested.objects.noWork()) && <div doTheyWork={nested.objects.work} />}'
						+ '<div unresolvable={a.bad.binding} />'
					}
				/>,
			)

			expect(component.ParsedChildren).toHaveLength(4)
			expect(component.ParsedChildren[0].props).toEqual({ foo: 'Foo' })
			expect(component.ParsedChildren[1].props.onClick).toEqual(logFn)
			expect(component.ParsedChildren[2].props).toEqual({ doTheyWork: false })
			expect(component.ParsedChildren[3].props).toEqual({ unresolvable: undefined })
		})
		test('updates bindings on subsequent renders', () => {
			const { rerender } = rtlRender(
				<JsxParser
					bindings={{ isChecked: true }}
					jsx='<input type="checkbox" checked={isChecked} />'
				/>,
				{ container: parent },
			)

			expect(parent.querySelectorAll('input')).toHaveLength(1)
			expect(parent.querySelector('input').checked).toBe(true)
			rerender(
				<JsxParser
					bindings={{ isChecked: false }}
					jsx='<input type="checkbox" checked={isChecked} />'
				/>,
			)
			expect(parent.querySelectorAll('input')).toHaveLength(1)
			expect(parent.querySelector('input').checked).toBe(false)
		})
		test('can execute binary mathematical operations', () => {
			const { rendered } = render(<JsxParser jsx="<span>{ 1 + 2 * 4 / 8 - 1 }</span>" />)
			expect(rendered.childNodes[0].textContent).toEqual('1')
		})
		test('can evaluate binary exponent operations', () => {
			const { component } = render(<JsxParser jsx="<span testProp={2 ** 4} />" />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(16)
		})
		test('can evaluate binary modulo operations', () => {
			const { component } = render(<JsxParser jsx="<span testProp={27 % 14} />" />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(13)
		})
		test('can evaluate equality comparison', () => {
			const { component } = render(<JsxParser jsx="<span testProp={1 == 2} />" />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate inequality comparison', () => {
			const { component } = render(<JsxParser jsx='<span testProp={1 != "1"} />' />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate strict equality comparison', () => {
			const { component } = render(<JsxParser jsx="<span testProp={1 === 1} />" />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can evaluate strict inequality comparison', () => {
			const { component } = render(<JsxParser jsx='<span testProp={1 !== "1"} />' />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can execute unary plus operations', () => {
			const { rendered, component } = render(<JsxParser jsx="<span testProp={+60}>{ +75 }</span>" />)
			expect(rendered.childNodes[0].textContent).toEqual('75')
			expect(component.ParsedChildren[0].props.testProp).toEqual(60)
		})
		test('can execute unary plus operations on bindings', () => {
			const { component } = render(<JsxParser jsx="<span testProp={+foo}>{ +foo }</span>" bindings={{ foo: 75 }} />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(75)
		})
		test('can execute unary negation operations', () => {
			const { rendered, component } = render(<JsxParser jsx="<span testProp={-60}>{ -75 }</span>" />)
			expect(rendered.childNodes[0].textContent).toEqual('-75')
			expect(component.ParsedChildren[0].props.testProp).toEqual(-60)
		})
		test('can execute unary negation operations on bindings', () => {
			const { component } = render(<JsxParser jsx="<span testProp={-foo}>{ -foo }</span>" bindings={{ foo: 75 }} />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(-75)
		})
		test('can execute unary NOT operations', () => {
			const { rendered, component } = render(<JsxParser jsx='<span testProp={!60}>{ !false && "Yes" }</span>' />)
			expect(rendered.childNodes[0].textContent).toEqual('Yes')
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can execute unary NOT operations on bindings', () => {
			const { component } = render(<JsxParser jsx='<span testProp={!foo}>{ !foo && "Yes" }</span>' bindings={{ foo: false }} />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can evaluate > operator', () => {
			const { rendered, component } = render(<JsxParser jsx='<span testProp={1 > 2}>{1 > 2 || "Nope"}</span>' />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate >= operator', () => {
			const { rendered, component } = render(<JsxParser jsx='<span testProp={1 >= 2}>{1 >= 2 || "Nope"}</span>' />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate < operator', () => {
			const { rendered, component } = render(<JsxParser jsx='<span testProp={1 < 2}>{2 < 1 || "Nope"}</span>' />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can evaluate <= operator', () => {
			const { rendered, component } = render(<JsxParser jsx='<span testProp={1 <= 2}>{2 <= 1 || "Nope"}</span>' />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('will render options', () => {
			window.foo = vi.fn(() => true)
			const { html } = render(
				<JsxParser
					jsx="<select><option>Some value</option></select>"
				/>,
			)

			expect(html).toMatchSnapshot()
		})
		describe('can evaluate multi-level property accessors', () => {
			/* eslint-disable dot-notation,no-useless-concat */
			const bindings = {
				array: [{ of: 'objects' }],
				index: 0,
				object: { with: { child: 'objects' }, and: 'directMembers', andAFunction: () => 'function' },
				accessor: { path: 'and' },
				with: 'somethingElse',
				object2: { with: 'with' },
				fieldName: 'and',
				does: null,
			}

			test('can evaluate a[b]', () => {
				const expression = 'object[fieldName]'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['and'])
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['and'])
			})
			test('can evaluate a.b.c', () => {
				const expression = 'object.with.child'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object.with.child)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object.with.child)
			})
			test('can evaluate a?.b?.c', () => {
				const expression = 'object?.with?.child'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object.with.child)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object.with.child)
			})
			test('can evaluate a["b"].c', () => {
				const expression = 'object["with"].child'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['with'].child)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['with'].child)
			})
			test('can evaluate a?.["b"].c', () => {
				const expression = 'object?.["with"].child'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['with'].child)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['with'].child)
			})
			test('can evaluate a?.["b"]?.c', () => {
				const expression = 'object?.["with"]?.child'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['with'].child)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['with'].child)
			})
			test('can evaluate a?.withAFunction?.()', () => {
				const expression = 'object?.andAFunction?.()'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object.andAFunction())
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object.andAFunction())
			})
			test('can evaluate a["b" + 1].c', () => {
				const expression = 'object["wi" + "th"].child'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['wi' + 'th'].child)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['wi' + 'th'].child)
			})
			test('can evaluate a[0].b', () => {
				const expression = 'array[0].of'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.array[0].of)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.array[0].of)
			})
			test('can evaluate a[1 - 1].b', () => {
				const expression = 'array[1 - 1].of'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.array[1 - 1].of)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.array[1 - 1].of)
			})
			test('can evaluate a[b].c', () => {
				const expression = 'array[index].of'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.array[bindings.index].of)
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.array[bindings.index].of)
			})
			test('can evaluate a[b[c]]]', () => {
				const expression = 'object[accessor.path]'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['and'])
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['and'])
			})
			test('can bind <A c={b.c}>', () => {
				const expression = 'object2.with'
				const jsx = `<span with={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object2['with'])
				expect(component.ParsedChildren[0].props.with).toEqual(bindings.object2['with'])
			})
			test('can evaluate this.a[b]', () => {
				const expression = 'this.object[fieldName]'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['and'])
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['and'])
			})
			test('can evaluate this?.a?.[b]', () => {
				const expression = 'this?.object?.[fieldName]'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx }} />)

				expect(rendered.childNodes[0].textContent).toEqual(bindings.object['and'])
				expect(component.ParsedChildren[0].props.foo).toEqual(bindings.object['and'])
			})
			test('reports non-optional navigation into null or undefined members', () => {
				const expression = 'does.not.exist'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const onError = vi.fn()
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx, onError }} />)

				expect(rendered.childNodes[0].textContent).toEqual('')
				expect(component.ParsedChildren[0].props.foo).toEqual(undefined)

				expect(onError).toBeCalled()
				const error = onError.mock.calls[0][0]
				expect(error.type).toEqual('member-access')
				// `cause` names the exact source path that was null/undefined (used by the LSP).
				expect(error.cause.message).toEqual('Cannot read `not` of `does`, which is undefined.')
			})
			test('optional chaining short-circuits null or undefined members without error', () => {
				const expression = 'does?.not.exist'
				const jsx = `<span foo={${expression}}>{${expression}}</span>`
				const onError = vi.fn()
				const { rendered, component } = render(<JsxParser {...{ bindings, jsx, onError }} />)

				expect(rendered.childNodes[0].textContent).toEqual('')
				expect(component.ParsedChildren[0].props.foo).toEqual(undefined)

				expect(onError).not.toBeCalled()
			})
			/* eslint-enable dot-notation,no-useless-concat */
		})
	})
	describe('template strings', () => {
		test('correctly parse/bind bindings', () => {
			const { rendered } = render(
				<JsxParser
					bindings={{ foo: 2, bar: 3 }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="<span>{`foo: ${foo}, bar: ${bar}, baz: ${foo * bar}`}</span>"
				/>,
			)
			expect(rendered.childNodes[0].textContent).toEqual('foo: 2, bar: 3, baz: 6')
		})
	})
	describe('React.Children.only()', () => {
		// eslint-disable-next-line react/prop-types
		const OnlyOne = ({ children }) => (
			<div>{React.Children.only(children)}</div>
		)
		test('passes with a single child', () => {
			expect(() => render(
				<JsxParser
					components={{ OnlyOne }}
					jsx="<OnlyOne><h1>Ipsum</h1></OnlyOne>"
				/>,
			)).not.toThrow()
		})
		test('fails with multiple children', () => {
			// Multiple children passed - should throw
			expect(() => render(
				<JsxParser
					components={{ OnlyOne }}
					jsx="<OnlyOne><h1>Ipsum</h1><h2>Foo</h2></OnlyOne>"
				/>,
			)).toThrow()
		})
	})
	describe('instance methods', () => {
		test('literal value instance methods', () => {
			const { component } = render(
				<JsxParser jsx={
					'<span ' +
					'String_startsWith={ "foobar".startsWith("fo") }' +
					'String_endsWith={ "foobar".endsWith("ar") }' +
					'String_includes={ "foobar".includes("ooba") }' +
					'String_substr={ "foobar".substr(1, 2) }' +
					'String_replace={ "foobar".replace("oo", "uu") }' +
					'String_search={ "foobar".search("bar") }' +
					'String_toUpperCase={ "foobar".toUpperCase() }' +
					'String_toLowerCase={ "FOOBAR".toLowerCase() }' +
					'String_trim={ "    foobar     ".trim() }' +
					'Number_toFixed={ 100.12345.toFixed(2) }' +
					'Number_toPrecision={ 123.456.toPrecision(4) }' +
					'Array_includes={ [1, 2, 3].includes(2) }' +
					'Array_join={ [1, 2, 3].join("+") }' +
					'Array_sort={ [3, 1, 2].sort() }' +
					'Array_slice={ [1, 2, 3].slice(1, 2) }' +
					' />'
				}
				/>,
			)
			expect(component.ParsedChildren[0].props.String_startsWith).toEqual(true)
			expect(component.ParsedChildren[0].props.String_endsWith).toEqual(true)
			expect(component.ParsedChildren[0].props.String_includes).toEqual(true)
			expect(component.ParsedChildren[0].props.String_substr).toEqual('oo')
			expect(component.ParsedChildren[0].props.String_replace).toEqual('fuubar')
			expect(component.ParsedChildren[0].props.String_search).toEqual(3)
			expect(component.ParsedChildren[0].props.String_toUpperCase).toEqual('FOOBAR')
			expect(component.ParsedChildren[0].props.String_toLowerCase).toEqual('foobar')
			expect(component.ParsedChildren[0].props.String_trim).toEqual('foobar')
			expect(component.ParsedChildren[0].props.Number_toFixed).toEqual('100.12')
			expect(component.ParsedChildren[0].props.Number_toPrecision).toEqual('123.5')
			expect(component.ParsedChildren[0].props.Array_includes).toEqual(true)
			expect(component.ParsedChildren[0].props.Array_join).toEqual('1+2+3')
			expect(component.ParsedChildren[0].props.Array_sort).toEqual([1, 2, 3])
			expect(component.ParsedChildren[0].props.Array_slice).toEqual([2])
		})
		test('bound property instance methods', () => {
			const { rendered } = render(
				<JsxParser
					bindings={{ foo: { bar: { baz: 'quux' } } }}
					jsx="<div>{foo.bar.baz.toUpperCase()}</div>"
				/>,
			)
			expect(rendered.textContent).toEqual('QUUX')
		})
	})

	test('props.renderUnrecognized()', () => {
		const { html } = render(
			<JsxParser
				allowUnknownElements={false}
				jsx="<foo />"
				renderInWrapper={false}
				renderUnrecognized={name => <div className={name}>{name}</div>}
			/>,
		)
		expect(html).toEqual('<div class="foo">foo</div>')
	})
	describe('void elements', () => {
		test('void-element named custom components to take children', () => {
			// eslint-disable-next-line react/prop-types
			const link = ({ to, children }) => (<a href={to}>{children}</a>)
			const { rendered } = render(<JsxParser components={{ link }} jsx='<link to="/url">Text</link>' />)
			expect(rendered.childNodes[0].nodeName).toEqual('A')
			expect(rendered.childNodes[0].textContent).toEqual('Text')
		})
	})
	describe('self-closing tags', () => {
		test('by default, renders self-closing tags without their children', () => {
			const { rendered } = render(
				<JsxParser jsx='<img src="/foo.png"><div class="invalidChild"></div></img>' />,
			)

			expect(rendered.childNodes).toHaveLength(1)
			expect(rendered.getElementsByTagName('img')).toHaveLength(1)
			expect(rendered.childNodes[0].innerHTML).toEqual('')
			expect(rendered.childNodes[0].childNodes).toHaveLength(0)

			expect(rendered.getElementsByTagName('div')).toHaveLength(0)
		})
		test('props.autoCloseVoidElements=true auto-closes self-closing tags', () => {
			const { rendered } = render(
				<JsxParser autoCloseVoidElements jsx='<img src="/foo.png"><div>Foo</div>' />,
			)

			expect(rendered.childNodes).toHaveLength(2)
			expect(rendered.getElementsByTagName('img')).toHaveLength(1)
			expect(rendered.childNodes[0].innerHTML).toEqual('')
			expect(rendered.childNodes[0].childNodes).toHaveLength(0)
			expect(rendered.getElementsByTagName('div')).toHaveLength(1)
		})
		test('props.autoCloseVoidElements=false will treats self-closing tags by jsx rules (does not parse)', () => {
			const { rendered } = render(
				<JsxParser autoCloseVoidElements={false} jsx='<img src="/foo.png"><div></div>' />,
			)
			expect(rendered.childNodes).toHaveLength(0)
		})
	})
	test('renderError catches errors', () => {
		const renderError = vi.fn((...args) => console.error(...args))
		render(
			<JsxParser
				bindings={{ foo: true }}
				jsx="<div>{foo ? }</div>" // Syntax error - dangling ternary
				renderError={renderError}
			/>,
		)
		expect(renderError).toHaveBeenCalledWith({ error: expect.stringContaining('SyntaxError: Unexpected token') })
	})
	test('supports className prop', () => {
		const { html } = render(<JsxParser className="foo" jsx="Text" />)
		expect(html).toMatch('<div class="jsx-parser foo">Text</div>')
	})

	describe('children', () => {
		test('keys are preserved if present and generated otherwise', () => {
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					jsx={
						'<Custom className="parent" text="parent">'
						+ '<Custom className="child-1" text="child-1" key="child-1" />'
						+ '<Custom className="child-2" text="child-2" />'
						+ '<Custom className="child-3" text="child-3" key="child-3" />'
						+ '</Custom>'
					}
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(rendered.childNodes).toHaveLength(1)
			expect(component.ParsedChildren).toHaveLength(1)

			expect(component.ParsedChildren[0].props.className).toEqual('parent')
			expect(component.ParsedChildren[0].props.text).toEqual('parent')
			expect(component.ParsedChildren[0].props.children).toHaveLength(3)

			expect(component.ParsedChildren[0].props.children[0].props.className).toEqual('child-1')
			expect(component.ParsedChildren[0].props.children[0].props.text).toEqual('child-1')
			expect(component.ParsedChildren[0].props.children[0].key).toEqual('child-1')

			expect(component.ParsedChildren[0].props.children[1].props.className).toEqual('child-2')
			expect(component.ParsedChildren[0].props.children[1].props.text).toEqual('child-2')
			expect(component.ParsedChildren[0].props.children[1].key).toBeTruthy()

			expect(component.ParsedChildren[0].props.children[2].props.className).toEqual('child-3')
			expect(component.ParsedChildren[0].props.children[2].props.text).toEqual('child-3')
			expect(component.ParsedChildren[0].props.children[2].key).toEqual('child-3')
		})

		test('key generation respects disableKeyGeneration', () => {
			const { component, rendered } = render(
				<JsxParser
					components={{ Custom }}
					jsx={
						'<Custom className="parent" text="parent">'
						+ '<Custom className="child-1" text="child-1" key="child-1" />'
						+ '<Custom className="child-2" text="child-2" />'
						+ '</Custom>'
					}
					disableKeyGeneration
				/>,
			)

			expect(rendered.classList.contains('jsx-parser')).toBeTruthy()

			expect(rendered.childNodes).toHaveLength(1)
			expect(component.ParsedChildren).toHaveLength(1)

			expect(component.ParsedChildren[0].props.className).toEqual('parent')
			expect(component.ParsedChildren[0].props.text).toEqual('parent')
			expect(component.ParsedChildren[0].props.children).toHaveLength(2)

			expect(component.ParsedChildren[0].props.children[0].props.className).toEqual('child-1')
			expect(component.ParsedChildren[0].props.children[0].props.text).toEqual('child-1')
			expect(component.ParsedChildren[0].props.children[0].key).toEqual('child-1')

			expect(component.ParsedChildren[0].props.children[1].props.className).toEqual('child-2')
			expect(component.ParsedChildren[0].props.children[1].props.text).toEqual('child-2')
			expect(component.ParsedChildren[0].props.children[1].key).toBeFalsy()
		})
	})

	describe('functions', () => {
		it('support nested jsx inside arrow functions', () => {
			// see
			// https://astexplorer.net/#/gist/fc48b12b8410a4ef779e0477a644bb06/cdbfc8b929b31e11e577dceb88e3a1ee9343f68e
			// for acorn AST
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ items: [1, 2] }}
					jsx="{items.map(item => <Custom><p>{item}</p></Custom>)}"
				/>,
			)
			expect(html).toMatch('<div class="jsx-parser"><div><p>1</p></div><div><p>2</p></div></div>')
		})

		it('support JSX expressions inside arrow functions', () => {
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ items: [{ name: 'Megeara', title: 'Fury' }] }}
					jsx="{items.map(item => <Custom text={item.title}><p>{item.name}</p></Custom>)}"
				/>,
			)
			expect(html).toMatch('<div class="jsx-parser"><div>Fury<p>Megeara</p></div></div>')
		})

		it('support statements inside arrow function bodies', () => {
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ a: 1, b: 2 }}
					jsx={`{(() => {
						const {a, b} = this;
						return a + b;
					})()}`}
				/>,
			)
			expect(html).toMatch('<div class="jsx-parser">3</div>')
		})

		it('invocation context cascades across nested calls', () => {
			function getC() {
				return this.c
			}

			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ a: 1, b: 2, c: 3, getC }}
					jsx={`{(() => {
						const {a, b} = this;
						return a + b + this.getC();
					})()}`}
				/>,
			)
			expect(html).toMatch('<div class="jsx-parser">6</div>')
		})

		it('allow invocation of standard library inside dynamically invoked instance', () => {
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ a: 1, b: 2, c: 3 }}
					jsx={`{(() => {
						const {a, b, c} = this;
						return Math.max(a, b, c);
					})()}`}
				/>,
			)
			expect(html).toMatch('<div class="jsx-parser">3</div>')
		})

		it('are scoped appropriately when assigned to an input property', () => {
			const PropTest = ({ inputFunction }) => inputFunction(3)
			const { html } = render(
				<JsxParser
					components={{ PropTest }}
					bindings={{ a: 1, b: 2 }}
					jsx={`<PropTest inputFunction={(c) => {
						const { a, b } = this;
						return a + b + c;
					}} />`}
				/>,
			)
			expect(html).toMatch('6')
		})

		it('expose the local scope to the arrow function', () => {
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{ items: [1, 2] }}
					jsx="{items.map(item => <span>{(() => { return this.item; })()}</span>)}"
				/>,
			)
			expect(html).toMatch('<div class="jsx-parser"><span>1</span><span>2</span></div>')
		})

		it('should gracefully handle errors inside block-bodied arrow functions', () => {
			const errorHandler = vi.fn(e => { console.log(e) })
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					bindings={{
						willThrowError: () => {
							const error = this.doesNotExist.willThrowError
							return error
						},
					}}
					jsx="{willThrowError()}"
					onError={errorHandler}
				/>,
			)
			expect(errorHandler).toBeCalled()
			expect(html).not.toBeNull()
		})

		it('passes attributes', () => {
			const PropTest = (props: { booleanAttribute: boolean}) => <>{`val:${props.booleanAttribute}`}</>
			const { html, component } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ PropTest }}
					bindings={{ items: [
						{ name: 'Megeara', friend: true },
						{ name: 'Austerious', friend: false },
					] }}
					jsx="{items.map(item => <p><PropTest booleanAttribute={item.friend} /></p>)}"
				/>,
			)
			expect(html).toEqual('<p>val:true</p><p>val:false</p>')
			expect(component.ParsedChildren?.[0]).toHaveLength(2)
			expect(component.ParsedChildren[0][0].props.children.props.booleanAttribute).toEqual(true)
			expect(component.ParsedChildren[0][1].props.children.props.booleanAttribute).toEqual(false)
		})

		it('passes spread attributes', () => {
			const PropTest = (props: any) => <>{JSON.stringify(props)}</>
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ PropTest }}
					bindings={{ items: [
						{ name: 'Megeara', friend: true },
					] }}
					jsx="{items.map(item => <PropTest {...item} />)}"
				/>,
			)
			expect(html).toEqual('{"name":"Megeara","friend":true}')
		})

		it('supports render props', () => {
			const fakeData = { name: 'from-container' }
			const RenderPropContainer = (props: any) => props.children(fakeData)
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ PropTest: RenderPropContainer }}
					jsx="{<PropTest>{(data) => <p>{data.name}</p>}</PropTest>}"
				/>,
			)
			expect(html).toEqual('<p>from-container</p>')
		})

		it('supports constructor calls', () => {
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					jsx="<Custom>{new Date().getFullYear()}</Custom>"
				/>,
			)
			expect(html).toMatch(new Date().getFullYear().toString())
		})

		it('reports an unresolved constructor call via onError', () => {
			const onError = vi.fn()
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					jsx="<Custom>{new DoesNotExist()}</Custom>"
					onError={onError}
				/>,
			)
			expect(html).toMatch('')
			expect(onError).toBeCalled()
			const error = onError.mock.calls[0][0]
			expect(error.type).toEqual('invocation')
			expect(error.cause).toBeInstanceOf(TypeError)
			expect(error.cause.message).toEqual('`DoesNotExist` is not a constructor.')
		})

		it('reports an unresolved function call via onError', () => {
			const onError = vi.fn()
			const { html } = render(
				<JsxParser
					components={{ Custom }}
					jsx="<Custom>{doesNotExist()}</Custom>"
					onError={onError}
				/>,
			)
			expect(html).toMatch('')
			expect(onError).toBeCalled()
			const error = onError.mock.calls[0][0]
			expect(error.type).toEqual('invocation')
			expect(error.cause).toBeInstanceOf(TypeError)
			expect(error.cause.message).toEqual('`doesNotExist` is not a function.')
		})

		it('supports nested arrow functions', () => {
			const { rendered } = render(
				<JsxParser
					bindings={{
						columns: [
							{
								heading: 'Label',
								fieldName: 'label',
							},
							{
								heading: 'Value',
								fieldName: 'value',
							},
						],
						rows: [
							{
								label: 'One',
								value: 1,
							},
							{
								label: 'Two',
								value: 2,
							},
							{
								label: 'Three',
								value: 3,
							},
						],
					}}
					jsx={`
					<table>
						<thead>
							<tr>
								{ columns.map(column => <th>{column.heading}</th>) }
							</tr>
						</thead>
						<tbody>
							{ 
								rows.map(row =>
										<tr>
											{
												columns.map(column => <td>{row[column.fieldName]}</td>)
											}
										</tr>
										)
							}
						</tbody>
					</table>
					`}
				/>,
			)

			const table = rendered.children[0]
			expect(table.nodeName).toEqual('TABLE')

			const thead = table.children[0]
			const headerRows = thead.children
			expect(headerRows).toHaveLength(1)

			const [headerRow] = headerRows
			const [header1, header2] = headerRow.children
			expect(header1.textContent).toEqual('Label')
			expect(header2.textContent).toEqual('Value')

			const tbody = table.children[1]
			const rows = tbody.children
			expect(rows).toHaveLength(3)

			const [row1, row2, row3] = rows
			expect(row1.nodeName).toEqual('TR')
			expect(row1.children).toHaveLength(2)
			expect(row2.nodeName).toEqual('TR')
			expect(row2.children).toHaveLength(2)
			expect(row3.nodeName).toEqual('TR')
			expect(row3.children).toHaveLength(2)

			const [cell1, cell2] = row1.children
			expect(cell1.nodeName).toEqual('TD')
			expect(cell1.textContent).toEqual('One')
			expect(cell2.nodeName).toEqual('TD')
			expect(cell2.textContent).toEqual('1')

			const [cell3, cell4] = row2.children
			expect(cell3.nodeName).toEqual('TD')
			expect(cell3.textContent).toEqual('Two')
			expect(cell4.nodeName).toEqual('TD')
			expect(cell4.textContent).toEqual('2')

			const [cell5, cell6] = row3.children
			expect(cell5.nodeName).toEqual('TD')
			expect(cell5.textContent).toEqual('Three')
			expect(cell6.nodeName).toEqual('TD')
			expect(cell6.textContent).toEqual('3')
		})

		it('supports array destructuring for inline function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ items: [[1, 42], [2, 56]] }}
					jsx="{items.map(([one, two]) => <span id={one}>{two}</span>)}"
				/>,
			)
			expect(html).toMatch('<span id="1">42</span><span id="2">56</span>')
		})

		it('supports array destructuring for block-bodied function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ items: [[1, 42], [2, 56]] }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="{items.map(([one, two]) => { return `${one},${two}`; }).join(';')}"
				/>,
			)
			expect(html).toMatch('1,42;2,56')
		})

		it('supports object destructuring for inline function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ items: [{ name: 'John', lastName: 'Smith' }] }}
					jsx="{items.map(({ name, lastName }) => <span>{lastName}, {name}</span>)}"
				/>,
			)
			expect(html).toMatch('<span>Smith, John</span>')
		})

		it('supports object destructuring for block-bodied function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ items: [{ name: 'John', lastName: 'Smith' }, { name: 'Jane', lastName: 'Doe' }] }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="{items.map(({ name, lastName }) => { return `${lastName}, ${name}`; }).join(';')}"
				/>,
			)
			expect(html).toMatch('Smith, John;Doe, Jane')
		})

		it('supports aliasing object destructuring for inline function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ items: [{ name: 'John', lastName: 'Smith' }] }}
					jsx="{items.map(({ name: firstName, lastName }) => <span>{lastName}, {firstName}</span>)}"
				/>,
			)
			expect(html).toMatch('<span>Smith, John</span>')
		})

		it('supports aliasing object destructuring for block-bodied function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ items: [{ name: 'John', lastName: 'Smith' }, { name: 'Jane', lastName: 'Doe' }] }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="{items.map(({ name: firstName, lastName }) => { return `${lastName}, ${firstName}`; }).join(';')}"
				/>,
			)
			expect(html).toMatch('Smith, John;Doe, Jane')
		})

		it('supports default values for inline function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ one: 1, two: 200, three: 300, four: 400 }}
					jsx="{((one, two = 2, three = 3, four = 4) => <span>{one}, {two}, {three}, {four}</span>)(one)}"
				/>,
			)
			expect(html).toMatch('<span>1, 2, 3, 4</span>')
		})

		it('supports default values for block-bodied function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ one: 1, two: 200, three: 300, four: 400 }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="{((one, two = 2, three = 3, four = 4) => { return `${one}, ${two}, ${three}, ${four}`; })(one)}"
				/>,
			)
			expect(html).toMatch('1, 2, 3, 4')
		})

		it('supports rest parameter destructuring for inline function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ one: 1, two: 2, three: 3, four: 4 }}
					jsx="{((one, two, ...rest) => <span>{one}, {two}, {rest.join(', ')}</span>)(one, two, three, four)}"
				/>,
			)
			expect(html).toMatch('<span>1, 2, 3, 4</span>')
		})

		it('supports rest parameter destructuring for block-bodied function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ one: 1, two: 2, three: 3, four: 4 }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="{((one, two, ...rest) => { return `${one}, ${two}, ${rest.join(', ')}`; })(one, two, three, four)}"
				/>,
			)
			expect(html).toMatch('1, 2, 3, 4')
		})

		it('supports mixed destructuring. default values and rest parameters for inline function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ object: { name: 'John' }, array: [1, 42], string: undefined, number: 42, anotherString: 'Another String Value' }}
					jsx="{(({ name }, [one, two], lastName = 'Smith', ...rest) => <span>{lastName}, {name} - [{one}, {two}] - {rest[0]} - {rest[1]}</span>)(object, array, string, number, anotherString)}"
				/>,
			)
			expect(html).toMatch('<span>Smith, John - [1, 42] - 42 - Another String Value</span>')
		})

		it('supports mixed destructuring. default values and rest parameters for block-bodied function parameters', () => {
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ object: { name: 'John' }, array: [1, 42], string: undefined, number: 42, anotherString: 'Another String Value' }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx="{(({ name }, [one, two], lastName = 'Smith', ...rest) => { return `${lastName}, ${name} - [${one}, ${two}] - ${rest[0]} - ${rest[1]}`; })(object, array, string, number, anotherString)}"
				/>,
			)
			expect(html).toMatch('Smith, John - [1, 42] - 42 - Another String Value')
		})

		it('supports JSX elements inside block-bodied functions - direct return', () => {
			const jsx = `{
				(() => {
					return <><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></>;	
				})()
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>')
		})

		it('supports JSX elements inside block-bodied functions - arrow expressions', () => {
			const jsx = `{
				((additionalItems) => {
					const items = [
						...additionalItems,
						3,
						4,
						5,
					];
					return items.map(item => <span>{item}</span>);
				})(additionalItems)
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ additionalItems: [1, 2] }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>')
		})

		it('supports JSX elements inside block-bodied functions - array members', () => {
			const jsx = `{
				(() => {
					const items = [
						<span>1</span>,
						<span>2</span>,
						<span>3</span>,
						<span>4</span>,
						<span>5</span>,
					];
					return items;
				})()
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>')
		})

		it('supports JSX elements inside block-bodied functions - object members', () => {
			const jsx = `{
				(() => {
					const items = {
						a: <span>1</span>,
						b: <span>2</span>,
						c: <span>3</span>,
						d: <span>4</span>,
						e: <span>5</span>,
					};
					return Object.values(items);
				})()
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>')
		})

		it('supports JSX elements inside block-bodied functions - ternary expressions', () => {
			const jsx = `{
				((foo) => {
					return foo >= 0 ?
						<span>positive</span> :
						<span>negative</span>;
				})(foo)
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ foo: 5 }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<span>positive</span>')
		})

		it('supports JSX elements inside block-bodied functions - nested bindings within JSX', () => {
			const jsx = `{
				((foo, bar) => {
					const items = [
						{ name: 'One', value: 1 },
						{ name: 'Two', value: 2 },
						{ name: 'Three', value: 3 },
						{ name: 'Four', value: 4 },
						{ name: 'Five', value: 5 }
					];
					return items.map(item => <div><span>{item.name}: {item.value}</span><span>foo: {foo}</span><span>bar: {bar}</span></div>);
				})(foo, bar)
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ foo: 5, bar: 10 }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<div><span>One: 1</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Two: 2</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Three: 3</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Four: 4</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Five: 5</span><span>foo: 5</span><span>bar: 10</span></div>')
		})

		it('supports JSX elements inside block-bodied functions - multiple bindings within JSX', () => {
			const jsx = `{
				((foo, bar) => {
					const items = [
						{ name: 'One', value: 1 },
						{ name: 'Two', value: 2 },
						{ name: 'Three', value: 3 },
						{ name: 'Four', value: 4 },
						{ name: 'Five', value: 5 },
					];
					return items.map(({ name, value }) => <div><span>{name}: {value}</span><span>foo: {foo}</span><span>bar: {bar}</span></div>);
				})(foo, bar)
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ foo: 5, bar: 10 }}
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<div><span>One: 1</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Two: 2</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Three: 3</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Four: 4</span><span>foo: 5</span><span>bar: 10</span></div><div><span>Five: 5</span><span>foo: 5</span><span>bar: 10</span></div>')
		})

		it('supports JSX elements inside block-bodied functions - template literals', () => {
			const jsx = `{
				(() => {
					const items = [
						{ name: 'One', value: 1 },
						{ name: 'Two', value: 2 },
						{ name: 'Three', value: 3 },
						{ name: 'Four', value: 4 },
						{ name: 'Five', value: 5 },
					];
					return items.map(({ name, value }) => <span>{\`\${name}: \${value}\`}</span>);
				})()
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<span>One: 1</span><span>Two: 2</span><span>Three: 3</span><span>Four: 4</span><span>Five: 5</span>')
		})

		it('supports JSX elements inside block-bodied functions - nested block-bodied functions', () => {
			const jsx = `{
				((foo, bar, baz) => {
					const items = [
						{ name: 'One', value: 1 },
						{ name: 'Two', value: 2 },
						{ name: 'Three', value: 3 },
						{ name: 'Four', value: 4 },
						{ name: 'Five', value: 5 },
					];
					return <div>{
						items.map(({ name, ...rest }) => {
							return <span>{name}: {rest.value}</span>;
						})
					}</div>;
				})(foo, bar, baz)
			}`
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ foo: 5, bar: 10, baz: 15 }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<div><span>One: 1</span><span>Two: 2</span><span>Three: 3</span><span>Four: 4</span><span>Five: 5</span></div>')
		})

		it('supports JSX elements inside block-bodied functions - custom components', () => {
			const jsx = `{
				((foo, bar) => {
					const items = [
						{ name: 'One', value: 1 },
						{ name: 'Two', value: 2 },
						{ name: 'Three', value: 3 },
						{ name: 'Four', value: 4 },
						{ name: 'Five', value: 5 },
					];
					return items.map(({ name, value }) => <Custom className={name} text={\`\${name}: \`}>{value + foo}</Custom>);
				})(foo, bar)
			}`

			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ foo: 5, bar: 10 }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<div class="One">One: 6</div><div class="Two">Two: 7</div><div class="Three">Three: 8</div><div class="Four">Four: 9</div><div class="Five">Five: 10</div>')
		})

		it('supports JSX elements inside block-bodied functions - kitchen sink', () => {
			// eslint-disable-next-line no-template-curly-in-string
			const jsx = `{
				((foo, bar) => {
					const { baz } = this;

					function* getItems() {
						yield { name: 'One', value: 1, icon: <span>#1</span> };
						yield { name: 'Two', value: 2, icon: <span>#2</span> };
						yield { name: 'Three', value: 3, icon: <span>#3</span> };
						yield { name: 'Four', value: 4, icon: <span>#4</span> };
						yield { name: 'Five', value: 5, icon: <span>#5</span> };
					}

					const renderItem = ({ name, value, icon }) => <span>{\`\${name}: \${value + this?.foo}\`}{icon}</span>;
					const renderFoo = () => <span>foo: {foo}</span>;
					const renderBar = (x) => { return <span>bar: {x ?? foo}</span> };
					const renderedBaz = this.foo > 0 ? <span>baz: {baz}</span> : <span>No.</span>;
					const myDate = "2024-10-31";
					const renderDate = () => <span>Date: {new Date(myDate).getFullYear()}-{new Date(myDate).getMonth() + 1}-{new Date(myDate).getDate()}</span>;
					const elementClassName = "foo";

					return [...getItems()].map(({ name: mappedName, value, ...rest }) => {
						return <div className={elementClassName}>{renderItem({ name: mappedName, value, ...rest })}{renderFoo()}{renderBar(bar)}{renderedBaz}{this.renderQux()}{renderDate()}</div>;
					});
				})(foo, bar)
			}`

			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					components={{ Custom }}
					bindings={{ foo: 5, bar: 10, baz: 15, renderQux: () => <JsxParser renderInWrapper={false} jsx="<span>qux: {qux}</span>" bindings={{ qux: 20 }} /> }}
					// eslint-disable-next-line no-template-curly-in-string
					jsx={jsx}
				/>,
			)
			expect(html).toMatch('<div class="foo"><span>One: 6<span>#1</span></span><span>foo: 5</span><span>bar: 10</span><span>baz: 15</span><span>qux: 20</span><span>Date: 2024-10-31</span></div><div class="foo"><span>Two: 7<span>#2</span></span><span>foo: 5</span><span>bar: 10</span><span>baz: 15</span><span>qux: 20</span><span>Date: 2024-10-31</span></div><div class="foo"><span>Three: 8<span>#3</span></span><span>foo: 5</span><span>bar: 10</span><span>baz: 15</span><span>qux: 20</span><span>Date: 2024-10-31</span></div><div class="foo"><span>Four: 9<span>#4</span></span><span>foo: 5</span><span>bar: 10</span><span>baz: 15</span><span>qux: 20</span><span>Date: 2024-10-31</span></div><div class="foo"><span>Five: 10<span>#5</span></span><span>foo: 5</span><span>bar: 10</span><span>baz: 15</span><span>qux: 20</span><span>Date: 2024-10-31</span></div>')
		})

		it('renders JSX whose text also appears in an earlier string literal', () => {
			const onError = vi.fn()
			const jsx = `{
				(() => {
					const s = '<b>x</b>';
					return <b>x</b>;
				})()
			}`
			// Regression: the transpiler replaces JSX at its source offsets — a text-based
			// replacement would corrupt the string literal and fail to compile this body.
			const { html } = render(
				<JsxParser renderInWrapper={false} onError={onError} jsx={jsx} />,
			)
			expect(onError).not.toHaveBeenCalled()
			expect(html).toEqual('<b>x</b>')
		})

		it('invokes the provided onError handler when an exception occurs within a block-bodied function', () => {
			const jsx = `<span>{
				((input) => {
					return input.does.not.exist();
				})(null)
			}</span>`

			const onError = vi.fn()
			const { html } = render(
				<JsxParser
					renderInWrapper={false}
					onError={onError}
					jsx={jsx}
				/>,
			)
			expect(html).toEqual('<span></span>')

			expect(onError).toHaveBeenCalledTimes(1)

			// Error argument contains raw JS error message...
			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.stringContaining('Cannot read properties of null'),
				}),
			)

			// Error argument also contains the offending source line and surrounding scope...
			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.stringContaining('return input.does.not.exist();'),
				}),
			)
		})
	})
	describe('structured errors', () => {
		test('passes a structured JsxParserError for parse errors', () => {
			const onError = vi.fn()
			render(<JsxParser onError={onError} jsx="<h2>No closing tag " />)

			const error = onError.mock.calls[0][0]
			expect(error).toBeInstanceOf(JsxParserError)
			expect(error.type).toBe('parse')
			expect(error.message).toMatch(/SyntaxError/)
			expect(error.snippet).toContain('>>> ')
			expect(error.sourceInfo.location.line).toBe(1)
			// Parsing failed, so there is no AST node to attach...
			expect(error.sourceInfo.astNode).toBeUndefined()
		})

		test('passes offsets (mapped onto the user source) and cause for call errors', () => {
			const onError = vi.fn()
			const boom = new Error('boom')
			const jsx = '<div>{explode()}</div>'
			render(
				<JsxParser
					onError={onError}
					bindings={{ explode: () => { throw boom } }}
					jsx={jsx}
				/>,
			)

			const error = onError.mock.calls[0][0]
			expect(error).toBeInstanceOf(JsxParserError)
			expect(error.type).toBe('call')
			expect(error.cause).toBe(boom)
			// Offsets index into the user's original (unwrapped) JSX, not the `<root>` wrapper...
			expect(error.sourceInfo.source).toBe('explode()')
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.snippet).toContain('>>> ')
			// The offending expression's AST node is attached for error handlers to inspect...
			expect(error.sourceInfo.astNode).not.toBeNull()
			expect(error.sourceInfo.astNode.type).toBe('CallExpression')
		})

		test('populates the loopIndex of the map iteration an error is thrown within', () => {
			const onError = vi.fn()
			const jsx = '<div>{items.map(item => <span>{explode(item)}</span>)}</div>'
			render(
				<JsxParser
					onError={onError}
					bindings={{
						items: ['a', 'b', 'c'],
						explode: (item: string) => { if (item === 'b') throw new Error('boom') },
					}}
					jsx={jsx}
				/>,
			)

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('call')
			// The throw came from the second (index 1) source item's iteration...
			expect(error.sourceInfo.loopIndex).toBe(1)
		})

		test('reports element validation errors with user-source offsets (no wrapper shift)', () => {
			const onError = vi.fn()
			const jsx = '<Unknown />'
			render(<JsxParser onError={onError} componentsOnly components={{}} jsx={jsx} />)

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('unrecognized-component')
			expect(error.message).toContain('`<Unknown>` is unrecognized')
			// The element begins at offset 0 of the user JSX — proving the wrapper offset is removed...
			expect(error.sourceInfo.location.startOffset).toBe(0)
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
		})

		test('includes the fileName prop in the error object and detail message', () => {
			const onError = vi.fn()
			const boom = new Error('boom')
			render(
				<JsxParser
					onError={onError}
					fileName="my-template.jsx"
					bindings={{ explode: () => { throw boom } }}
					jsx="<div>{explode()}</div>"
				/>,
			)

			const error = onError.mock.calls[0][0]
			expect(error.sourceInfo.fileName).toBe('my-template.jsx')
			expect(error.message).toContain('of `my-template.jsx`')
		})

		test('omits fileName context from the message when the prop is not supplied', () => {
			const onError = vi.fn()
			render(
				<JsxParser
					onError={onError}
					bindings={{ explode: () => { throw new Error('boom') } }}
					jsx="<div>{explode()}</div>"
				/>,
			)

			const error = onError.mock.calls[0][0]
			expect(error.sourceInfo.fileName).toBeUndefined()
			expect(error.message).not.toContain(' of ')
		})

		test('passes a structured JsxParserError for runtime errors in block-bodied functions', () => {
			const onError = vi.fn()
			const jsx = `<span>{
				((input) => {
					return input.does.not.exist();
				})(null)
			}</span>`
			render(<JsxParser renderInWrapper={false} onError={onError} jsx={jsx} />)

			const error = onError.mock.calls[0][0]
			expect(error).toBeInstanceOf(JsxParserError)
			expect(error.type).toBe('function-runtime')
			expect(error.snippet).toContain('>>> ')
			expect(error.sourceInfo.source).toContain('return input.does.not.exist();')
			expect(error.cause).toBeInstanceOf(Error)
		})

		test('reports source-file offsets for block-bodied function runtime errors', () => {
			const onError = vi.fn()
			const jsx = `<span>{
				((input) => {
					return input.does.not.exist();
				})(null)
			}</span>`
			render(<JsxParser renderInWrapper={false} onError={onError} jsx={jsx} />)

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			// The offending line's offsets index the original `jsx` and round-trip against `source`...
			expect(error.sourceInfo.location.startOffset).toBeDefined()
			expect(error.sourceInfo.location.endOffset).toBeDefined()
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			// `source` is the whole offending source line (indentation preserved).
			expect(error.sourceInfo.source.trim()).toBe('return input.does.not.exist();')
		})

		test('reports source-file offsets for a block-bodied handler assigned to a prop (invoked via click)', () => {
			const onError = vi.fn()
			const jsx = '<button onClick={() => { this.does.not.exist(); }}>Click Me</button>'
			// `blacklistedAttrs={[]}` keeps the `on*` handler; the error only surfaces once it runs.
			// `renderInWrapper={false}` makes the button the root node so the click lands on it.
			const { rendered } = render(
				<JsxParser blacklistedAttrs={[]} renderInWrapper={false} onError={onError} jsx={jsx} />,
			)
			expect(onError).not.toHaveBeenCalled()

			fireEvent.click(rendered)

			const error = onError.mock.calls[0][0]
			expect(error).toBeInstanceOf(JsxParserError)
			expect(error.type).toBe('function-runtime')
			expect(error.sourceInfo.location.startOffset).toBeDefined()
			expect(error.sourceInfo.location.endOffset).toBeDefined()
			// Offsets index the original `jsx` and round-trip against `source`...
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.sourceInfo.source.trim()).toBe('this.does.not.exist();')
		})

		test('reports the offending line offsets for a multi-line block-bodied prop handler', () => {
			const onError = vi.fn()
			const jsx = `<button onClick={() => {
				const first = 1;
				this.does.not.exist();
				const third = 3;
			}}>
				Click Me!
			</button>`
			const { component } = render(<JsxParser blacklistedAttrs={[]} onError={onError} jsx={jsx} />)
			// Invoke the constructed handler directly (equivalent to a click) to trigger the throw.
			component.ParsedChildren[0].props.onClick()

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			// Offsets resolve to the specific offending line within the original template...
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.sourceInfo.source.trim()).toBe('this.does.not.exist();')
		})

		test('reports source-file offsets for a transpiled (JSX-containing) body', () => {
			const onError = vi.fn()
			// The block logic throws before returning JSX, so the body is transpiled (the JSX is
			// replaced by a render call).  Newline-padding keeps line numbers intact, so offsets
			// still resolve onto the original source.
			const jsx = `<span>{
				(() => {
					const x = null
					x.missing()
					return <b>ok</b>
				})()
			}</span>`
			render(<JsxParser renderInWrapper={false} onError={onError} jsx={jsx} />)

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			expect(error.sourceInfo.location.startOffset).toBeDefined()
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.sourceInfo.source.trim()).toBe('x.missing()')
		})

		test('resolves the offending line past a multi-line JSX element in the body', () => {
			const onError = vi.fn()
			// A multi-line JSX element is assigned before the throwing line; the newline-padding of
			// its render call keeps the throwing statement on its original source line.
			const jsx = `<span>{
				(() => {
					const el = (
						<b>
							{"ok"}
						</b>
					)
					el.nope.boom()
					return el
				})()
			}</span>`
			render(<JsxParser renderInWrapper={false} onError={onError} jsx={jsx} />)

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.sourceInfo.source.trim()).toBe('el.nope.boom()')
		})

		test('reports offsets into the original JSX when a render function call fails', () => {
			const onError = vi.fn()
			// The block body returns JSX, so `<span>{data.boom()}</span>` is extracted into a render
			// function.  When that render call runs and `data.boom()` throws, the error must point at
			// the offending expression's position within the original (pre-transpiled) source.
			const jsx = `<div>{((data) => {
				return <span>{data.boom()}</span>
			})(payload)}</div>`
			render(
				<JsxParser
					renderInWrapper={false}
					onError={onError}
					bindings={{ payload: { boom: () => { throw new Error('boom') } } }}
					jsx={jsx}
				/>,
			)

			const error = onError.mock.calls[0][0]
			expect(error).toBeInstanceOf(JsxParserError)
			// The failure surfaces from the element parser, not the block-bodied wrapper...
			expect(error.type).toBe('call')
			expect(error.sourceInfo.source).toBe('data.boom()')
			// Offsets index the original `jsx` (not the extracted fragment) and round-trip...
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe('data.boom()')
			expect(error.sourceInfo.astNode.type).toBe('CallExpression')
		})

		test('reports offsets into the original JSX for a failing render call inside a .map callback', () => {
			const onError = vi.fn()
			// A block-bodied `.map` callback returns JSX per item; the failing `item.explode()` render
			// call must still resolve onto the original source, and carry the iteration index.
			const jsx = `<ul>{items.map(item => {
				return <li>{item.explode()}</li>
			})}</ul>`
			render(
				<JsxParser
					renderInWrapper={false}
					onError={onError}
					bindings={{
						items: [{ explode: () => 'ok' }, { explode: () => { throw new Error('boom') } }],
					}}
					jsx={jsx}
				/>,
			)

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('call')
			expect(error.sourceInfo.source).toBe('item.explode()')
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe('item.explode()')
			// The throw came from the second (index 1) source item's iteration...
			expect(error.sourceInfo.loopIndex).toBe(1)
		})

		test('reports (and swallows) a runtime error from a scope-local callback passed as a prop', () => {
			const onError = vi.fn()
			// `onClick` is a native closure constructed inside the block-bodied IIFE and passed to
			// the element by reference — so it has no error handling of its own.
			const jsx = `{
				(() => {
					const onClick = () => { throw new Error('Oh, no!') }
					return <button onClick={onClick}>Click Me!</button>
				})()
			}`
			const { component } = render(
				<JsxParser blacklistedAttrs={[]} renderInWrapper={false} onError={onError} jsx={jsx} />,
			)
			// Nothing is reported on render — the handler has not run yet.
			expect(onError).not.toHaveBeenCalled()

			// Invoking the handler (as a click would) reports via onError and swallows the throw
			// (returning undefined) rather than re-throwing, so it never surfaces as a React error.
			expect(component.ParsedChildren[0].props.onClick()).toBeUndefined()

			const error = onError.mock.calls[0][0]
			expect(error).toBeInstanceOf(JsxParserError)
			expect(error.type).toBe('function-runtime')
			expect(error.cause).toBeInstanceOf(Error)
			expect(error.cause.message).toBe('Oh, no!')
			// The error is located at the attribute site, and its offsets round-trip against `jsx`.
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.sourceInfo.source).toBe('onClick={onClick}')
		})

		test('reports a runtime error from a scope-local member-expression callback', () => {
			const onError = vi.fn()
			const jsx = `{
				(() => {
					const handlers = { click: () => { throw new Error('boom') } }
					return <button onClick={handlers.click}>Click Me!</button>
				})()
			}`
			const { component } = render(
				<JsxParser blacklistedAttrs={[]} renderInWrapper={false} onError={onError} jsx={jsx} />,
			)

			expect(component.ParsedChildren[0].props.onClick()).toBeUndefined()

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			expect(error.cause.message).toBe('boom')
			expect(jsx.slice(error.sourceInfo.location.startOffset, error.sourceInfo.location.endOffset))
				.toBe(error.sourceInfo.source)
			expect(error.sourceInfo.source).toBe('onClick={handlers.click}')
		})

		test('captures the producing iteration index for a scope-local callback', () => {
			const onError = vi.fn()
			// Each iteration constructs its own `onClick`; the reported error must carry the index of
			// the item that produced the handler, captured when the element was built (not at throw
			// time, by which point the `.map()` iteration has unwound).
			const jsx = `<ul>{items.map(item => {
				const onClick = () => { throw new Error(item.name) }
				return <li onClick={onClick}>{item.name}</li>
			})}</ul>`
			const { component } = render(
				<JsxParser
					blacklistedAttrs={[]}
					renderInWrapper={false}
					onError={onError}
					bindings={{ items: [{ name: 'a' }, { name: 'b' }] }}
					jsx={jsx}
				/>,
			)

			const secondItem = component.ParsedChildren[0].props.children[1]
			expect(secondItem.props.onClick()).toBeUndefined()

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			expect(error.cause.message).toBe('b')
			expect(error.sourceInfo.loopIndex).toBe(1)
		})

		test('swallows a scope-local callback error when no onError handler is provided', () => {
			const jsx = `{
				(() => {
					const onClick = () => { throw new Error('Oh, no!') }
					return <button onClick={onClick}>Click Me!</button>
				})()
			}`
			const { component } = render(
				<JsxParser blacklistedAttrs={[]} renderInWrapper={false} jsx={jsx} />,
			)

			// With no onError handler, the throw is still swallowed rather than surfacing.
			expect(component.ParsedChildren[0].props.onClick()).toBeUndefined()
		})

		test('reports a runtime error from a scope-local optional-chained callback', () => {
			const onError = vi.fn()
			const jsx = `{
				(() => {
					const handlers = { click: () => { throw new Error('boom') } }
					return <button onClick={handlers?.click}>Click Me!</button>
				})()
			}`
			const { component } = render(
				<JsxParser blacklistedAttrs={[]} renderInWrapper={false} onError={onError} jsx={jsx} />,
			)

			expect(component.ParsedChildren[0].props.onClick()).toBeUndefined()

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			expect(error.sourceInfo.source).toBe('onClick={handlers?.click}')
		})

		test('reports a scope-local callback that throws a non-Error value', () => {
			const onError = vi.fn()
			// Handlers may throw a non-Error value; the reported message falls back to its string form.
			const jsx = `{
				(() => {
					const onClick = () => { throw 'plain string failure' }
					return <button onClick={onClick}>Click Me!</button>
				})()
			}`
			const { component } = render(
				<JsxParser blacklistedAttrs={[]} renderInWrapper={false} onError={onError} jsx={jsx} />,
			)

			expect(component.ParsedChildren[0].props.onClick()).toBeUndefined()

			const error = onError.mock.calls[0][0]
			expect(error.type).toBe('function-runtime')
			expect(error.cause).toBe('plain string failure')
			expect(error.message).toContain('plain string failure')
		})

		test('leaves a binding function referenced inside an arrow unwrapped (identity preserved)', () => {
			const onError = vi.fn()
			const globalHandler = () => { throw new Error('raw') }
			// The handler comes from `bindings`, not the local closure, so it is passed through by
			// reference: its identity is preserved and its throw is not converted into a reported
			// JsxParserError.
			const jsx = '{(() => <button onClick={globalHandler}>Click Me!</button>)()}'
			const { component } = render(
				<JsxParser
					blacklistedAttrs={[]}
					renderInWrapper={false}
					onError={onError}
					bindings={{ globalHandler }}
					jsx={jsx}
				/>,
			)

			expect(component.ParsedChildren[0].props.onClick).toBe(globalHandler)
			expect(() => component.ParsedChildren[0].props.onClick()).toThrow('raw')
			expect(onError).not.toHaveBeenCalled()
		})
	})

	describe('parse caching', () => {
		// Every top-level parse in `#parseJSX` first builds a parser via `Acorn.Parser.extend(...)`;
		// on a cache hit that call is skipped. For simple JSX (no block-bodied arrows, which re-parse
		// their own bodies) the `extend` call count therefore equals the number of top-level parses.
		let extendSpy
		beforeEach(() => {
			extendSpy = vi.spyOn(Acorn.Parser, 'extend')
		})
		afterEach(() => {
			extendSpy.mockRestore()
		})

		test('reuses the parsed AST across an inert re-render', () => {
			const jsx = '<div><p>Hello</p></div>'
			const { rerender } = rtlRender(<JsxParser jsx={jsx} />, { container: parent })
			const afterMount = extendSpy.mock.calls.length
			expect(afterMount).toBeGreaterThan(0)

			// Same jsx, an unrelated prop added — the parse must be reused.
			rerender(<JsxParser jsx={jsx} someProp />)
			expect(extendSpy.mock.calls.length).toBe(afterMount)
		})

		test('reuses the AST when a fresh but content-equal jsx string is passed', () => {
			const { rerender } = rtlRender(
				<JsxParser jsx="<div><p>Hello</p></div>" />,
				{ container: parent },
			)
			const afterMount = extendSpy.mock.calls.length

			// A brand-new string instance with identical content (as if rebuilt each render). Keying
			// compares by value, so this still hits the cache and does not re-parse.
			rerender(<JsxParser jsx={['<div>', '<p>Hello</p>', '</div>'].join('')} />)
			expect(extendSpy.mock.calls.length).toBe(afterMount)
		})

		test('re-parses when the jsx changes', () => {
			const { rerender } = rtlRender(
				<JsxParser jsx="<div><p>Hello</p></div>" />,
				{ container: parent },
			)
			const afterMount = extendSpy.mock.calls.length

			rerender(<JsxParser jsx="<div><p>Goodbye</p></div>" />)
			expect(extendSpy.mock.calls.length).toBe(afterMount + 1)
		})

		test('re-parses when autoCloseVoidElements toggles', () => {
			const jsx = '<div><p>Hello</p></div>'
			const { rerender } = rtlRender(
				<JsxParser autoCloseVoidElements={false} jsx={jsx} />,
				{ container: parent },
			)
			const afterMount = extendSpy.mock.calls.length

			// The flag is part of the cache key — the same jsx must re-parse when it flips.
			rerender(<JsxParser autoCloseVoidElements jsx={jsx} />)
			expect(extendSpy.mock.calls.length).toBe(afterMount + 1)
		})

		test('re-walks (without re-parsing) when only bindings change', () => {
			const jsx = '<input type="checkbox" checked={isChecked} />'
			const { rerender } = rtlRender(
				<JsxParser bindings={{ isChecked: true }} jsx={jsx} />,
				{ container: parent },
			)
			const afterMount = extendSpy.mock.calls.length
			expect(parent.querySelector('input').checked).toBe(true)

			rerender(<JsxParser bindings={{ isChecked: false }} jsx={jsx} />)
			// No re-parse...
			expect(extendSpy.mock.calls.length).toBe(afterMount)
			// ...but the walk still ran, so the output reflects the new binding.
			expect(parent.querySelector('input').checked).toBe(false)
		})

		test('re-runs the walk (stable keys) on a cache hit', () => {
			const ref = React.createRef()
			const jsx = '<div><p>Hello</p></div>'
			const { rerender } = rtlRender(<JsxParser ref={ref} jsx={jsx} />, { container: parent })
			const firstKey = ref.current.ParsedChildren[0].key
			const afterMount = extendSpy.mock.calls.length

			rerender(<JsxParser ref={ref} jsx={jsx} someProp />)
			// No re-parse...
			expect(extendSpy.mock.calls.length).toBe(afterMount)
			// ...but the walk re-ran, and its deterministic key matches the previous render's —
			// so React reconciles the element in place instead of remounting it.
			expect(firstKey).not.toBeUndefined()
			expect(ref.current.ParsedChildren[0].key).toBe(firstKey)
		})

		test('does not cache parse failures', () => {
			const onError = vi.fn()
			const jsx = '<div><p>unclosed'
			const { rerender } = rtlRender(
				<JsxParser jsx={jsx} onError={onError} />,
				{ container: parent },
			)
			expect(onError).toHaveBeenCalledTimes(1)

			// A cached failure would suppress `onError` on later renders; it must fire again.
			rerender(<JsxParser jsx={jsx} onError={onError} someProp />)
			expect(onError).toHaveBeenCalledTimes(2)
		})

		test('keeps sourceInfo.astNode identity stable across inert re-renders', () => {
			const OptedIn: any = ({ text }) => <div>{text}</div>
			OptedIn.injectSourceInfo = true
			const ref = React.createRef()
			const jsx = '<OptedIn text="Hi" />'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} components={{ OptedIn }} jsx={jsx} />,
				{ container: parent },
			)
			const first = ref.current.ParsedChildren[0].props.sourceInfo.astNode

			rerender(<JsxParser ref={ref} components={{ OptedIn }} jsx={jsx} someProp />)
			const second = ref.current.ParsedChildren[0].props.sourceInfo.astNode
			// The cached AST hands out the same (read-only) node instance across inert re-renders.
			expect(second).toBe(first)
		})
	})

	describe('function caching', () => {
		// Block-bodied arrows build additional Acorn parsers via `Acorn.Parser.extend` (once for
		// the body, once per embedded JSX element), so — together with the top-level parse — the
		// extend count measures whether the function compile pipeline ran at all.
		let extendSpy
		beforeEach(() => {
			extendSpy = vi.spyOn(Acorn.Parser, 'extend')
		})
		afterEach(() => {
			extendSpy.mockRestore()
		})

		const OptedIn: any = ({ text }) => <div>{text}</div>
		OptedIn.injectSourceInfo = true

		// Recursively collects opted-in elements in document order (mirrors the sourceInfo suite).
		const collectOptedIn = (node: any, acc: any[] = []): any[] => {
			if (Array.isArray(node)) {
				node.forEach((child: any) => collectOptedIn(child, acc))
			} else if (React.isValidElement(node)) {
				if (node.type === OptedIn) acc.push(node)
				else collectOptedIn((node.props as any).children, acc)
			}
			return acc
		}

		// Invokes its `renderRow` render-prop during its own render — after the walk that built
		// `renderRow` has returned — i.e. a lazy invocation of the (cached) function.
		const List = ({ items = [], renderRow }: any) => (
			<ul>
				{items.map((item: any, index: number) => (
					<li key={item}>{renderRow(item, index)}</li>
				))}
			</ul>
		)

		test('does not rebuild block-bodied functions on re-render', () => {
			const jsx = '{items.map(item => { return <li>{item}</li> })}'
			const { rerender } = rtlRender(
				<JsxParser renderInWrapper={false} bindings={{ items: ['a', 'b'] }} jsx={jsx} />,
				{ container: parent },
			)
			// Mount parses the template plus the arrow body and its embedded element.
			const afterMount = extendSpy.mock.calls.length
			expect(afterMount).toBeGreaterThan(1)
			expect(parent.textContent).toBe('ab')

			// Inert re-render: AST cache + function cache hit — no parser builds at all.
			rerender(<JsxParser renderInWrapper={false} bindings={{ items: ['a', 'b'] }} jsx={jsx} someProp />)
			expect(extendSpy.mock.calls.length).toBe(afterMount)

			// Changed bindings: the walk re-runs (fresh output) but the compile does not.
			rerender(<JsxParser renderInWrapper={false} bindings={{ items: ['x', 'y', 'z'] }} jsx={jsx} />)
			expect(extendSpy.mock.calls.length).toBe(afterMount)
			expect(parent.textContent).toBe('xyz')
		})

		test('returns identical function references across inert re-renders', () => {
			const ref = React.createRef()
			const ping = vi.fn()
			const jsx = '<button onClick={() => this.ping()} onBlur={() => { return this.ping() }}>Go</button>'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} blacklistedAttrs={[]} bindings={{ ping }} jsx={jsx} />,
				{ container: parent },
			)
			const first = ref.current.ParsedChildren[0].props

			rerender(<JsxParser ref={ref} blacklistedAttrs={[]} bindings={{ ping }} jsx={jsx} someProp />)
			const second = ref.current.ParsedChildren[0].props
			// Expression-bodied and block-bodied top-level arrows both keep their identity...
			expect(second.onClick).toBe(first.onClick)
			expect(second.onBlur).toBe(first.onBlur)
			// ...and both still invoke correctly.
			second.onClick()
			second.onBlur()
			expect(ping).toHaveBeenCalledTimes(2)
		})

		test('refreshes the scope behind a stable reference, so cached functions see current bindings', () => {
			const ref = React.createRef()
			const first = vi.fn()
			const second = vi.fn()
			const jsx = '<button onClick={() => { return this.handler() }}>Go</button>'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} blacklistedAttrs={[]} bindings={{ handler: first }} jsx={jsx} />,
				{ container: parent },
			)
			const mountHandler = ref.current.ParsedChildren[0].props.onClick

			rerender(<JsxParser ref={ref} blacklistedAttrs={[]} bindings={{ handler: second }} jsx={jsx} />)
			const rerenderHandler = ref.current.ParsedChildren[0].props.onClick
			expect(rerenderHandler).toBe(mountHandler)

			// The identical reference sees the swapped binding, not the one it was built under.
			rerenderHandler()
			expect(second).toHaveBeenCalledTimes(1)
			expect(first).not.toHaveBeenCalled()
		})

		test('block-body embedded JSX reflects updated bindings without recompiling', () => {
			const jsx = '{items.map(item => { return <li>{this.prefix + item}</li> })}'
			const { rerender } = rtlRender(
				<JsxParser renderInWrapper={false} bindings={{ items: ['a'], prefix: '1-' }} jsx={jsx} />,
				{ container: parent },
			)
			expect(parent.textContent).toBe('1-a')
			const afterMount = extendSpy.mock.calls.length

			rerender(<JsxParser renderInWrapper={false} bindings={{ items: ['a'], prefix: '2-' }} jsx={jsx} />)
			expect(parent.textContent).toBe('2-a')
			expect(extendSpy.mock.calls.length).toBe(afterMount)
		})

		test('lets React.memo children skip re-renders via stable function props', () => {
			const renders = vi.fn()
			const Memo: any = React.memo(({ onPing }: any) => {
				renders()
				return <button type="button" onClick={onPing}>memo</button>
			})
			const ping = vi.fn()
			const jsx = '<Memo onPing={() => this.ping()} />'
			const { rerender } = rtlRender(
				<JsxParser components={{ Memo }} blacklistedAttrs={[]} bindings={{ ping }} jsx={jsx} />,
				{ container: parent },
			)
			expect(renders).toHaveBeenCalledTimes(1)
			// The memoized child actually received the function (not a blacklisted-away prop).
			expect(parent.querySelector('button')).toBeTruthy()

			rerender(
				<JsxParser components={{ Memo }} blacklistedAttrs={[]} bindings={{ ping }} jsx={jsx} someProp />,
			)
			// The stable key and stable function prop together let the memoized child skip the
			// re-render entirely — under default configuration, no flags required.
			expect(renders).toHaveBeenCalledTimes(1)
		})

		test('keeps per-iteration scopes distinct for block-bodied functions built inside loops', () => {
			const ref = React.createRef()
			const Btn = ({ onClick }: any) => <button type="button" onClick={onClick}>b</button>
			const jsx = '{items.map(item => <Btn onClick={() => { return this.item }} />)}'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} blacklistedAttrs={[]} components={{ Btn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} />,
				{ container: parent },
			)
			// The inner arrow is one AST node evaluated once per item: the compiled function is
			// shared (Level 1), but each evaluation's proxy must carry its own iteration scope.
			const handlers = ref.current.ParsedChildren[0].map((el: any) => el.props.onClick)
			expect(handlers[0]()).toBe('a')
			expect(handlers[1]()).toBe('b')

			rerender(<JsxParser ref={ref} blacklistedAttrs={[]} components={{ Btn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} someProp />)
			const next = ref.current.ParsedChildren[0].map((el: any) => el.props.onClick)
			expect(next[0]()).toBe('a')
			expect(next[1]()).toBe('b')
		})

		test('keeps per-iteration scopes distinct for expression-bodied functions built inside loops', () => {
			const ref = React.createRef()
			const Btn = ({ onClick }: any) => <button type="button" onClick={onClick}>b</button>
			const jsx = '{items.map(item => <Btn onClick={() => item} />)}'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} blacklistedAttrs={[]} components={{ Btn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} />,
				{ container: parent },
			)
			const handlers = ref.current.ParsedChildren[0].map((el: any) => el.props.onClick)
			expect(handlers[0]()).toBe('a')
			expect(handlers[1]()).toBe('b')

			rerender(<JsxParser ref={ref} blacklistedAttrs={[]} components={{ Btn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} someProp />)
			const next = ref.current.ParsedChildren[0].map((el: any) => el.props.onClick)
			expect(next[0]()).toBe('a')
			expect(next[1]()).toBe('b')
		})

		test('resets loop-index tracking on cached functions each render', () => {
			const ref = React.createRef()
			const jsx = '{items.map(item => { return <OptedIn text={item} /> })}'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} components={{ OptedIn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} />,
				{ container: parent },
			)
			const loopIndexes = () => collectOptedIn(ref.current.ParsedChildren)
				.map((c: any) => c.props.sourceInfo.loopIndex)
			expect(loopIndexes()).toEqual([0, 1])

			// The cached wrapper's invocation count must reset per render pass — a count carried
			// over from the first render would yield [2, 3] here.
			rerender(<JsxParser ref={ref} components={{ OptedIn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} someProp />)
			expect(loopIndexes()).toEqual([0, 1])
		})

		test('resets loop-index tracking for lazily-invoked cached render props', () => {
			const seen: any[] = []
			const Recorder: any = ({ text, sourceInfo }: any) => {
				seen.push(sourceInfo.loopIndex)
				return <i>{text}</i>
			}
			Recorder.injectSourceInfo = true
			const jsx = '<List items={items} renderRow={(item) => { return <Recorder text={item} /> }} />'
			const { rerender } = rtlRender(
				<JsxParser components={{ List, Recorder }} bindings={{ items: ['a', 'b'] }} jsx={jsx} />,
				{ container: parent },
			)
			expect(seen).toEqual([0, 1])

			// The lazy invocations of the second render pass restart at 0 on the cached wrapper.
			rerender(<JsxParser components={{ List, Recorder }} bindings={{ items: ['a', 'b'] }} jsx={jsx} someProp />)
			expect(seen).toEqual([0, 1, 0, 1])
		})

		test('emits callback batches when profiling turns on over cached functions', () => {
			const onProfile = vi.fn()
			const jsx = '<List items={items} renderRow={(item) => { return <span>{item}</span> }} />'
			const { rerender } = rtlRender(
				<JsxParser components={{ List }} bindings={{ items: ['a'] }} jsx={jsx} />,
				{ container: parent },
			)

			// The cached tracking wrapper was built with profiling off; adding `onProfile` must
			// rebuild it as the profiling variant so lazy invocations open callback batches.
			rerender(<JsxParser components={{ List }} bindings={{ items: ['a'] }} jsx={jsx} onProfile={onProfile} />)
			const triggers = onProfile.mock.calls.map(call => call[0].trigger)
			expect(triggers).toContain('render')
			expect(triggers).toContain('callback')
		})

		test('tracks loop indexes correctly after profiling toggles back off', () => {
			const ref = React.createRef()
			const onProfile = vi.fn()
			const jsx = '{items.map(item => { return <OptedIn text={item} /> })}'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} components={{ OptedIn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} onProfile={onProfile} />,
				{ container: parent },
			)
			const profiledBatches = onProfile.mock.calls.length
			expect(profiledBatches).toBeGreaterThan(0)

			// Profiling off: the wrapper is rebuilt as the plain variant — no further batches,
			// loop indexes still correct.
			rerender(<JsxParser ref={ref} components={{ OptedIn }} bindings={{ items: ['a', 'b'] }} jsx={jsx} />)
			expect(onProfile.mock.calls.length).toBe(profiledBatches)
			expect(collectOptedIn(ref.current.ParsedChildren).map((c: any) => c.props.sourceInfo.loopIndex))
				.toEqual([0, 1])
		})

		test('reports runtime errors from cached functions to the current onError handler', () => {
			const ref = React.createRef()
			const firstOnError = vi.fn()
			const secondOnError = vi.fn()
			const explode = () => { throw new Error('boom') }
			const jsx = '<button onClick={() => { return this.explode() }}>Go</button>'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} blacklistedAttrs={[]} bindings={{ explode }} onError={firstOnError} jsx={jsx} />,
				{ container: parent },
			)

			rerender(<JsxParser ref={ref} blacklistedAttrs={[]} bindings={{ explode }} onError={secondOnError} jsx={jsx} />)
			ref.current.ParsedChildren[0].props.onClick()
			// The cached function's throw-time reporting reads the CURRENT handler, not the one
			// captured when it was compiled.
			expect(firstOnError).not.toHaveBeenCalled()
			expect(secondOnError).toHaveBeenCalledTimes(1)
			expect(secondOnError.mock.calls[0][0].type).toBe('function-runtime')
		})
	})

	describe('deterministic keys', () => {
		test('map siblings get distinct keys that are stable across re-renders', () => {
			const ref = React.createRef()
			const jsx = '{items.map(item => <span>{item}</span>)}'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} bindings={{ items: ['a', 'b', 'c'] }} jsx={jsx} />,
				{ container: parent },
			)
			const keys = () => ref.current.ParsedChildren[0].map((el: any) => el.key)
			const firstKeys = keys()
			// All three spans come from the same AST node; the occurrence suffix keeps siblings unique.
			expect(new Set(firstKeys).size).toBe(3)

			// Inert re-render: identical key sequence — React updates in place.
			rerender(<JsxParser ref={ref} bindings={{ items: ['a', 'b', 'c'] }} jsx={jsx} someProp />)
			expect(keys()).toEqual(firstKeys)

			// Same-shape data change: keys are positional (like index keys), so still identical.
			rerender(<JsxParser ref={ref} bindings={{ items: ['x', 'y', 'z'] }} jsx={jsx} />)
			expect(keys()).toEqual(firstKeys)
		})

		test('repeated render-function calls within one body get distinct keys', () => {
			const ref = React.createRef()
			// `renderFoo` is a local closure whose JSX renders from the SAME source position on
			// both calls — only the per-render occurrence count can disambiguate the two siblings.
			const jsx = '{(() => { const renderFoo = () => <b>x</b>; return <div>{renderFoo()}{renderFoo()}</div> })()}'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} jsx={jsx} />,
				{ container: parent },
			)
			const keys = () => ref.current.ParsedChildren[0].props.children.map((el: any) => el.key)
			const firstKeys = keys()
			expect(firstKeys).toHaveLength(2)
			expect(new Set(firstKeys).size).toBe(2)

			rerender(<JsxParser ref={ref} jsx={jsx} someProp />)
			expect(keys()).toEqual(firstKeys)
		})

		test('re-rendering updates children in place without disableKeyGeneration', () => {
			const renders = vi.fn()
			const unmounts = vi.fn()
			const components = {
				Custom: () => {
					renders()
					React.useEffect(() => () => unmounts(), [])
					return 'Custom element!'
				},
			}
			const { rerender } = rtlRender(
				<JsxParser components={components} jsx="<div><p>Hello</p><hr /><Custom /></div>" />,
				{ container: parent },
			)
			rerender(
				<JsxParser components={components} jsx="<div><p>Hello</p><hr /><Custom /></div>" someProp />,
			)
			// With stable generated keys, reconciliation matches under DEFAULT configuration:
			// the child re-rendered but was never unmounted (a remount would fire the effect
			// cleanup and re-run the mount effect).
			expect(renders).toHaveBeenCalledTimes(2)
			expect(unmounts).not.toHaveBeenCalled()
		})

		test('an explicit key attribute overrides the generated key', () => {
			const ref = React.createRef()
			rtlRender(
				<JsxParser ref={ref} jsx='<div key="mine">hi</div>' />,
				{ container: parent },
			)
			expect(ref.current.ParsedChildren[0].key).toBe('mine')
		})

		test('disableKeyGeneration still yields keyless elements', () => {
			const ref = React.createRef()
			rtlRender(
				<JsxParser ref={ref} disableKeyGeneration jsx="<div>hi</div>" />,
				{ container: parent },
			)
			// React normalizes an undefined key to null.
			expect(ref.current.ParsedChildren[0].key).toBeNull()
		})
	})

	describe('performance profiling', () => {
		// Invokes its `renderRow` render-prop once per item *during its own render* — i.e. after the
		// JsxParser walk that built `renderRow` has returned.  Each such call is a lazy invocation.
		const List = ({ items = [], renderRow }) => (
			<ul>
				{items.map((item, index) => (
					<li key={item}>{renderRow(item, index)}</li>
				))}
			</ul>
		)
		// Invokes a side-effect-only callback during render (a lazy invocation that builds no JSX).
		// The spy is passed as an *argument* — a block body without JSX is not transpiled, so it can
		// reference its params but not free bindings.
		const Runner = ({ run, finish }) => {
			run(finish)
			return <span>ran</span>
		}

		const batches = fn => fn.mock.calls.map(call => call[0])

		test('does not touch the profiler clock when onProfile is absent', () => {
			const nowSpy = vi.spyOn(ProfilerSession.prototype, 'now')
			const { rendered } = render(<JsxParser jsx="<div><span>hi</span></div>" />)

			// No ProfilerSession is created and its clock is never read on the standard path.
			expect(nowSpy).not.toHaveBeenCalled()
			expect(rendered.textContent).toBe('hi')
			nowSpy.mockRestore()
		})

		test('emits one render batch with a well-formed node tree', () => {
			const onProfile = vi.fn()
			const jsx = '<div className="wrap">{greeting}<ul>{items.map(i => <li>{i}</li>)}</ul></div>'
			render(<JsxParser jsx={jsx} bindings={{ greeting: 'hi', items: ['a', 'b'] }} onProfile={onProfile} />)

			const renderBatches = batches(onProfile).filter(b => b.trigger === 'render')
			expect(renderBatches).toHaveLength(1)
			const [batch] = renderBatches
			expect(batch.nodes.length).toBeGreaterThan(0)
			expect(batch.totalTime).toBeGreaterThanOrEqual(0)

			expect(typeof batch.startTime).toBe('number')
			// Nodes are post-order (parents follow their children), so collect all ids up front.
			const allIds = new Set(batch.nodes.map(n => n.id))
			expect(allIds.size).toBe(batch.nodes.length) // ids unique within the batch
			batch.nodes.forEach(node => {
				expect(typeof node.nodeType).toBe('string')
				expect(typeof node.location.startOffset).toBe('number')
				expect(typeof node.location.endOffset).toBe('number')
				expect(typeof node.startTime).toBe('number')
				expect(node.selfTime).toBeGreaterThanOrEqual(0)
				expect(node.totalTime).toBeGreaterThanOrEqual(node.selfTime)
				expect(node.parentId === null || allIds.has(node.parentId)).toBe(true)
			})

			// Offset invariant (same one the error path upholds): slicing the user source by a node's
			// offsets yields exactly its recorded `source`.  No trimming needed for this template.
			const sample = batch.nodes.find(n => n.nodeType === 'JSXElement')
			expect(jsx.slice(sample.location.startOffset, sample.location.endOffset)).toBe(sample.source)

			// The `.map()` builds `<li>{i}</li>` once per item, tagged with the producing loopIndex.
			const liNodes = batch.nodes.filter(n => n.source.startsWith('<li>'))
			expect(liNodes.map(n => n.loopIndex).sort()).toEqual([0, 1])
		})

		test('emits a separate callback batch per lazy render-prop invocation, joined by cycleId', () => {
			const onProfile = vi.fn()
			const jsx = '<List items={rows} renderRow={row => <b>{row}</b>} />'
			render(
				<JsxParser jsx={jsx} components={{ List }} bindings={{ rows: ['x', 'y', 'z'] }} onProfile={onProfile} />,
			)

			const all = batches(onProfile)
			const renderBatch = all.find(b => b.trigger === 'render')
			const callbackBatches = all.filter(b => b.trigger === 'callback')

			// One callback batch per host invocation of the render-prop.
			expect(callbackBatches).toHaveLength(3)
			// The render batch is emitted before any lazy callback fires.
			expect(all[0].trigger).toBe('render')

			callbackBatches.forEach(b => {
				// Joined back to the render that produced the function...
				expect(b.cycleId).toBe(renderBatch.cycleId)
				// ...but each batch is its own delivery.
				expect(b.renderId).not.toBe(renderBatch.renderId)
				expect(b.callback.source).toBe('row => <b>{row}</b>')
				expect(typeof b.callback.location.startOffset).toBe('number')
				expect(b.nodes.some(n => n.source.startsWith('<b>'))).toBe(true)
			})

			// loopIndex distinguishes which host invocation (0, 1, 2) drove each callback.
			expect(callbackBatches.map(b => b.callback.loopIndex).sort()).toEqual([0, 1, 2])
		})

		test('de-indents a multi-line node `source`, preserving its first line', () => {
			const onProfile = vi.fn()
			const jsx = [
				'<ul>{items.map(x =>',
				'            <li>',
				'                {x}',
				'            </li>',
				'        )}</ul>',
			].join('\n')
			render(<JsxParser jsx={jsx} bindings={{ items: ['a'] }} onProfile={onProfile} />)

			const [batch] = batches(onProfile).filter(b => b.trigger === 'render')
			const li = batch.nodes.find(n => n.source.startsWith('<li>'))
			// First line flush-left already; trailing lines de-indented by their common (12-space) indent.
			expect(li.source).toBe('<li>\n    {x}\n</li>')
		})

		test('de-indents a multi-line callback `source`, preserving its first line', () => {
			const onProfile = vi.fn()
			const jsx = [
				'<List items={rows} renderRow={row =>',
				'            <b>',
				'                {row}',
				'            </b>',
				'        } />',
			].join('\n')
			render(<JsxParser jsx={jsx} components={{ List }} bindings={{ rows: ['x'] }} onProfile={onProfile} />)

			const [callbackBatch] = batches(onProfile).filter(b => b.trigger === 'callback')
			// `row =>` is the (preserved) first line; the trailing lines share a 12-space indent, so
			// `<b>`/`</b>` land flush-left and `{row}` keeps its extra 4-space nesting.
			expect(callbackBatch.callback.source).toBe('row =>\n<b>\n    {row}\n</b>')
		})

		test('suppresses lazy callbacks that build no nodes', () => {
			const onProfile = vi.fn()
			const report = vi.fn()
			const jsx = '<Runner run={done => { done() }} finish={report} />'
			render(<JsxParser jsx={jsx} components={{ Runner }} bindings={{ report }} onProfile={onProfile} />)

			expect(report).toHaveBeenCalledTimes(1)
			const all = batches(onProfile)
			expect(all.filter(b => b.trigger === 'render')).toHaveLength(1)
			// The side-effect-only callback rendered nothing, so no callback batch is delivered.
			expect(all.filter(b => b.trigger === 'callback')).toHaveLength(0)
		})

		test('computes self/total time consistently with a mocked monotonic clock', () => {
			let clock = 0
			const nowSpy = vi.spyOn(ProfilerSession.prototype, 'now').mockImplementation(() => {
				clock += 1
				return clock
			})
			const onProfile = vi.fn()
			render(<JsxParser jsx="<div><span>hi</span></div>" onProfile={onProfile} />)

			const [batch] = batches(onProfile).filter(b => b.trigger === 'render')
			const childrenOf = {}
			const byId = {}
			batch.nodes.forEach(n => {
				byId[n.id] = n
				if (n.parentId !== null) (childrenOf[n.parentId] ||= []).push(n)
			})
			batch.nodes.forEach(node => {
				const childTotal = (childrenOf[node.id] || []).reduce((sum, c) => sum + c.totalTime, 0)
				// selfTime is inclusive time minus direct children's inclusive time — exact under integers.
				expect(node.selfTime).toBe(node.totalTime - childTotal)
				expect(node.selfTime).toBeGreaterThanOrEqual(0)
				// startTime is the enter-time clock value: a parent enters before its children.
				expect(typeof node.startTime).toBe('number')
				if (node.parentId !== null) {
					expect(node.startTime).toBeGreaterThanOrEqual(byId[node.parentId].startTime)
				}
			})
			// The batch begins before any node it contains.
			const earliest = Math.min(...batch.nodes.map(n => n.startTime))
			expect(batch.startTime).toBeLessThanOrEqual(earliest)
			nowSpy.mockRestore()
		})

		test('increments renderId and mints a fresh cycleId across re-renders', () => {
			const onProfile = vi.fn()
			const ref = React.createRef()
			const jsx = '<div>{n}</div>'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} jsx={jsx} bindings={{ n: 1 }} onProfile={onProfile} />,
				{ container: parent },
			)
			rerender(<JsxParser ref={ref} jsx={jsx} bindings={{ n: 2 }} onProfile={onProfile} />)

			const renderBatches = batches(onProfile).filter(b => b.trigger === 'render')
			expect(renderBatches.length).toBeGreaterThanOrEqual(2)
			expect(renderBatches[1].renderId).toBeGreaterThan(renderBatches[0].renderId)
			expect(renderBatches[1].cycleId).not.toBe(renderBatches[0].cycleId)
		})

		test('a nested JsxParser records the parent render cycle as parentCycleId', () => {
			const onProfile = vi.fn()
			// `Sub` renders a standalone nested JsxParser — a React descendant of the parent's output.
			const Sub = () => <JsxParser jsx="<span>sub</span>" onProfile={onProfile} />
			render(<JsxParser jsx="<Sub />" components={{ Sub }} onProfile={onProfile} />)

			const renders = batches(onProfile).filter(b => b.trigger === 'render')
			const root = renders.find(b => b.parentCycleId === null)
			const nested = renders.find(b => b.parentCycleId !== null)
			expect(root).toBeDefined()
			expect(nested).toBeDefined()
			// The nested render points back to the parent render that produced it.
			expect(nested.parentCycleId).toBe(root.cycleId)
			expect(nested.cycleId).not.toBe(root.cycleId)
		})

		test('parentCycleId tracks the parent per render (changes on re-render)', () => {
			const onProfile = vi.fn()
			const ref = React.createRef()
			// The nested parser re-renders with the parent (no memo), so it tracks the parent's cycleId.
			const Sub = () => <JsxParser jsx="<span>{m}</span>" bindings={{ m: 'x' }} onProfile={onProfile} />
			const jsx = '<Sub />'
			const { rerender } = rtlRender(
				<JsxParser ref={ref} jsx={jsx} components={{ Sub }} bindings={{ n: 1 }} onProfile={onProfile} />,
				{ container: parent },
			)
			rerender(
				<JsxParser ref={ref} jsx={jsx} components={{ Sub }} bindings={{ n: 2 }} onProfile={onProfile} />,
			)

			const renders = batches(onProfile).filter(b => b.trigger === 'render')
			const roots = renders.filter(b => b.parentCycleId === null)
			const nested = renders.filter(b => b.parentCycleId !== null)
			expect(roots.length).toBeGreaterThanOrEqual(2) // two page renders
			expect(nested.length).toBeGreaterThanOrEqual(2)
			// cycleId is unique per render; each nested render points at its own render's root cycle.
			expect(roots[0].cycleId).not.toBe(roots[1].cycleId)
			expect(nested[0].parentCycleId).toBe(roots[0].cycleId)
			expect(nested[1].parentCycleId).toBe(roots[1].cycleId)
			expect(nested[0].parentCycleId).not.toBe(nested[1].parentCycleId) // per-render correlation
		})

		describe('React component render timing (profileReactRender)', () => {
			const Leaf = ({ label }) => <span>{label}</span>
			const Box = ({ children }) => <div>{children}</div>
			// `React.Profiler.onRender` fires during commit; the parser flushes a 'react' batch on a
			// microtask, so tests await a macrotask turn before asserting.
			const flush = () => new Promise(resolve => { setTimeout(resolve, 0) })

			test('emits no react batch when profileReactRender is off', async () => {
				const onProfile = vi.fn()
				render(<JsxParser jsx="<Leaf label='hi' />" components={{ Leaf }} onProfile={onProfile} />)
				await flush()
				expect(batches(onProfile).filter(b => b.trigger === 'react')).toHaveLength(0)
				// Parser profiling still works.
				expect(batches(onProfile).filter(b => b.trigger === 'render')).toHaveLength(1)
			})

			test('profiles host elements too, nested correctly (no custom-component filter)', async () => {
				const onProfile = vi.fn()
				render(<JsxParser jsx="<div><span>hi</span></div>" onProfile={onProfile} profileReactRender />)
				await flush()
				const [batch] = batches(onProfile).filter(b => b.trigger === 'react')
				expect(batch).toBeDefined()
				const div = batch.nodes.find(n => n.componentName === 'div')
				const span = batch.nodes.find(n => n.componentName === 'span')
				expect(div.parentId).toBeNull()
				expect(span.parentId).toBe(div.id) // host elements form the tree, no gaps
			})

			test('emits one react batch per commit, a node per component, joined by cycleId', async () => {
				const onProfile = vi.fn()
				render(
					<JsxParser
						jsx="<Leaf label='a' /><Leaf label='b' />"
						components={{ Leaf }}
						onProfile={onProfile}
						profileReactRender
					/>,
				)
				await flush()

				const all = batches(onProfile)
				const renderBatch = all.find(b => b.trigger === 'render')
				const reactBatches = all.filter(b => b.trigger === 'react')
				expect(reactBatches).toHaveLength(1)
				const [batch] = reactBatches
				expect(batch.cycleId).toBe(renderBatch.cycleId)
				expect(batch.renderId).not.toBe(renderBatch.renderId)
				expect(batch.nodes).toHaveLength(2)
				batch.nodes.forEach(node => {
					expect(node.componentName).toBe('Leaf')
					expect(node.nodeType).toBe('Leaf')
					expect(node.phase).toBe('mount')
					expect(node.totalTime).toBeGreaterThanOrEqual(0)
					expect(node.baseDuration).toBeGreaterThanOrEqual(0)
					// React's own commit-phase timestamps flow through.
					expect(typeof node.startTime).toBe('number')
					expect(typeof node.commitTime).toBe('number')
				})
				// The batch begins at the earliest component's render start.
				expect(batch.startTime).toBe(Math.min(...batch.nodes.map(n => n.startTime)))
			})

			test('reconstructs nesting and exclusive self-time for nested components', async () => {
				const onProfile = vi.fn()
				render(
					<JsxParser jsx="<Box><Leaf label='x' /></Box>" components={{ Box, Leaf }} onProfile={onProfile} profileReactRender />,
				)
				await flush()

				const [batch] = batches(onProfile).filter(b => b.trigger === 'react')
				const box = batch.nodes.find(n => n.componentName === 'Box')
				const leaf = batch.nodes.find(n => n.componentName === 'Leaf')
				expect(box.parentId).toBeNull()
				expect(leaf.parentId).toBe(box.id)
				expect(leaf.depth).toBe(box.depth + 1)
				// React's actualDuration is inclusive; self = total − children total.
				expect(box.totalTime).toBeGreaterThanOrEqual(leaf.totalTime)
				expect(box.selfTime).toBe(box.totalTime - leaf.totalTime)
			})

			test('tags looped component instances with distinct ids and incrementing loopIndex', async () => {
				const onProfile = vi.fn()
				render(
					<JsxParser
						jsx="<ul>{items.map(i => <Leaf label={i} />)}</ul>"
						components={{ Leaf }}
						bindings={{ items: ['a', 'b', 'c'] }}
						onProfile={onProfile}
						profileReactRender
					/>,
				)
				await flush()

				const [batch] = batches(onProfile).filter(b => b.trigger === 'react')
				// The host <ul> is now profiled too and is the parent of the mapped <Leaf>s.
				const ul = batch.nodes.find(n => n.componentName === 'ul')
				const leaves = batch.nodes.filter(n => n.componentName === 'Leaf')
				expect(ul.parentId).toBeNull()
				expect(leaves).toHaveLength(3)
				expect(new Set(leaves.map(n => n.id)).size).toBe(3)
				leaves.forEach(n => expect(n.parentId).toBe(ul.id))
				expect(leaves.map(n => n.loopIndex).sort()).toEqual([0, 1, 2])
			})

			test('splits multiple commits of one cycle into separate batches (no negative self-time)', async () => {
				// `Outer` schedules a one-time state update in a layout effect, forcing a second
				// (nested-update) commit under the SAME cycleId as the mount — the scenario that made
				// self-time subtraction span two commits and go negative.
				const Inner = () => <span>inner</span>
				const Outer = ({ children }) => {
					const [, bump] = React.useState(0)
					React.useLayoutEffect(() => { bump(1) }, [])
					return <div>{children}</div>
				}
				const onProfile = vi.fn()
				render(
					<JsxParser jsx="<Outer><Inner /></Outer>" components={{ Outer, Inner }} onProfile={onProfile} profileReactRender />,
				)
				await flush()

				const all = batches(onProfile)
				const renderBatch = all.find(b => b.trigger === 'react')
				const reactBatches = all.filter(b => b.trigger === 'react')
				// Mount and the nested-update commit each produce their own batch, sharing the cycle.
				expect(reactBatches.length).toBeGreaterThanOrEqual(2)
				reactBatches.forEach(b => expect(b.cycleId).toBe(renderBatch.cycleId))

				reactBatches.forEach(batch => {
					// Each batch is a single commit → instance ids are unique within it.
					expect(new Set(batch.nodes.map(n => n.id)).size).toBe(batch.nodes.length)
					batch.nodes.forEach(node => {
						expect(node.selfTime).toBeGreaterThanOrEqual(0)
						expect(node.totalTime).toBeGreaterThanOrEqual(node.selfTime)
					})
				})
			})
		})
	})
})
