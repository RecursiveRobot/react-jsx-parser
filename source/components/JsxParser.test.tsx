// @ts-nocheck
/* eslint-disable function-paren-newline, no-console, no-underscore-dangle */
import React from 'react'
import TestUtils from 'react-dom/test-utils'
import { mount, shallow } from 'enzyme' // eslint-disable-line import/no-extraneous-dependencies
import JsxParser from './JsxParser'

jest.unmock('acorn-jsx')
jest.unmock('./JsxParser')

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
		console.error = jest.fn()

		originalJsDomEmit = window._virtualConsole.emit
		window._virtualConsole.emit = jest.fn()
	})

	afterAll(() => {
		console.error = originalConsoleError
		window._virtualConsole.emit = originalJsDomEmit
	})

	beforeEach(() => {
		console.error.mockReset()
		window._virtualConsole.emit.mockReset()
		parent = document.createElement('div')
	})

	function render(element) {
		const wrapper = mount(element, { attachTo: parent })
		return {
			component: wrapper.instance(),
			html: wrapper.html(),
			parent,
			rendered: wrapper.getDOMNode(),
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
			expect(custom instanceof Custom)
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
			expect(custom instanceof Custom)
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
			expect(custom instanceof Custom)
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
			expect(custom instanceof Custom)
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
			const wrapper = shallow(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(wrapper.html()).toBe('Test Test')
		})
		test('renders falsy expressions correctly', () => {
			const jsx = '<b>{false}{undefined}{0}{null}{[]}</b>'
			const wrapper = shallow(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(wrapper.html()).toBe('<b>0</b>')
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
			expect(custom instanceof Custom)
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
			expect(custom instanceof Custom)
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
			const onError = jest.fn()
			const wrapper = mount(
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
					message: expect.stringContaining('<foo> is unrecognized'),
				}),
			)
			expect(onError).toHaveBeenCalledWith(
				expect.objectContaining({
					message: expect.stringContaining('<bar> is unrecognized'),
				}),
			)
			expect(wrapper.html()).toMatchSnapshot()
		})
		test('renders errors with renderError prop, if supplied', () => {
			const onError = jest.fn()
			// eslint-disable-next-line
			const renderError = ({ error }) => <div className="error">{error}</div>
			const { rendered } = render(
				<JsxParser {...{ onError, renderError }} jsx="<h2>No closing tag " />,
			)

			expect(onError).toHaveBeenCalledTimes(1)
			expect(rendered.querySelectorAll('h2')).toHaveLength(0)
			expect(rendered.querySelectorAll('div')).toHaveLength(1)
			expect(rendered.textContent).toMatch(/SyntaxError: Expected corresponding JSX closing tag for <h2>/)
		})
		test('re-rendering should update child elements rather than unmount and remount them', () => {
			const updates = jest.fn()
			const unmounts = jest.fn()
			const components = {
				Custom: class extends React.Component {
					componentDidUpdate() { updates() }
					componentWillUnmount() { unmounts() }
					render() { return 'Custom element!' }
				},
			}
			const wrapper = mount(
				<JsxParser
					components={components}
					disableKeyGeneration
					jsx="<div><p>Hello</p><hr /><Custom /></div>"
				/>,
			)
			wrapper.setProps({ someProp: true })
			expect(updates).toHaveBeenCalled()
			expect(unmounts).not.toHaveBeenCalled()
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
			expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'script')).toHaveLength(0)
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
			expect(TestUtils.scryRenderedDOMComponentsWithTag(component, 'script')).toHaveLength(0)
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
			const { rendered } = render(<JsxParser components={{ tr }} jsx={'<tr> <a href="/url">Text</a> </tr>'} />)
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
			const wrapper = shallow(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(wrapper.html()).toBe(jsx)
		})
		test('keeps line-breaks', () => {
			const jsx = '<code class="markdown"># hello\n\na paragraph\n</code>'
			const wrapper = shallow(<JsxParser jsx={jsx} renderInWrapper={false} />)
			expect(wrapper.html()).toBe(jsx)
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
			const { component } = render(<JsxParser components={{ Custom }} jsx={'<Custom obj={{ foo: "bar", bar: "foo" }} />'} />)

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
			const wrapper = mount(
				<JsxParser
					bindings={{ isChecked: true }}
					jsx={'<input type="checkbox" checked={isChecked} />'}
				/>,
			)

			expect(wrapper.find('input')).toHaveLength(1)
			expect(wrapper.find('input').props().checked).toBe(true)
			wrapper.setProps({ bindings: { isChecked: false } })
			expect(wrapper.find('input')).toHaveLength(1)
			expect(wrapper.find('input').props().checked).toBe(false)
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
			const { component } = render(<JsxParser jsx={'<span testProp={1 != "1"} />'} />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate strict equality comparison', () => {
			const { component } = render(<JsxParser jsx="<span testProp={1 === 1} />" />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can evaluate strict inequality comparison', () => {
			const { component } = render(<JsxParser jsx={'<span testProp={1 !== "1"} />'} />)
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
			const { rendered, component } = render(<JsxParser jsx={'<span testProp={!60}>{ !false && "Yes" }</span>'} />)
			expect(rendered.childNodes[0].textContent).toEqual('Yes')
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can execute unary NOT operations on bindings', () => {
			const { component } = render(<JsxParser jsx={'<span testProp={!foo}>{ !foo && "Yes" }</span>'} bindings={{ foo: false }} />)
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can evaluate > operator', () => {
			const { rendered, component } = render(<JsxParser jsx={'<span testProp={1 > 2}>{1 > 2 || "Nope"}</span>'} />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate >= operator', () => {
			const { rendered, component } = render(<JsxParser jsx={'<span testProp={1 >= 2}>{1 >= 2 || "Nope"}</span>'} />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(false)
		})
		test('can evaluate < operator', () => {
			const { rendered, component } = render(<JsxParser jsx={'<span testProp={1 < 2}>{2 < 1 || "Nope"}</span>'} />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('can evaluate <= operator', () => {
			const { rendered, component } = render(<JsxParser jsx={'<span testProp={1 <= 2}>{2 <= 1 || "Nope"}</span>'} />)
			expect(rendered.childNodes[0].textContent).toEqual('Nope')
			expect(component.ParsedChildren[0].props.testProp).toEqual(true)
		})
		test('will render options', () => {
			window.foo = jest.fn(() => true)
			const wrapper = mount(
				<JsxParser
					jsx="<select><option>Some value</option></select>"
				/>,
			)

			expect(wrapper.html()).toMatchSnapshot()
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
			const { rendered } = render(<JsxParser components={{ link }} jsx={'<link to="/url">Text</link>'} />)
			expect(rendered.childNodes[0].nodeName).toEqual('A')
			expect(rendered.childNodes[0].textContent).toEqual('Text')
		})
	})
	describe('self-closing tags', () => {
		test('by default, renders self-closing tags without their children', () => {
			const { rendered } = render(
				<JsxParser showWarnings jsx='<img src="/foo.png"><div class="invalidChild"></div></img>' />,
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
			const errorHandler = jest.fn(e => { console.log(e) })
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
	})
})
