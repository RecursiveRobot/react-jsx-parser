import { trimExcessLeadingWhitespaceFromSource } from './errorUtilities'

describe('trimExcessLeadingWhitespaceFromSource', () => {
	it('de-indents lines after the first by their common leading whitespace', () => {
		const source = [
			'items.map((x, i) =>',
			'            <div>',
			'                {x.label}',
			'            </div>',
			'        )',
		].join('\n')

		expect(trimExcessLeadingWhitespaceFromSource(source)).toBe([
			'items.map((x, i) =>',
			'    <div>',
			'        {x.label}',
			'    </div>',
			')',
		].join('\n'))
	})

	it('preserves the first line verbatim', () => {
		const source = 'foo(() =>\n\t\t<span>hi</span>\n\t)'
		expect(trimExcessLeadingWhitespaceFromSource(source).split('\n')[0]).toBe('foo(() =>')
	})

	it('returns a single-line source unchanged', () => {
		expect(trimExcessLeadingWhitespaceFromSource('<li>{i}</li>')).toBe('<li>{i}</li>')
	})

	it('ignores blank lines when computing the common indent', () => {
		const source = [
			'items.map(x =>',
			'      <p>',
			'',
			'      </p>)',
		].join('\n')

		expect(trimExcessLeadingWhitespaceFromSource(source)).toBe([
			'items.map(x =>',
			'<p>',
			'',
			'</p>)',
		].join('\n'))
	})
})
