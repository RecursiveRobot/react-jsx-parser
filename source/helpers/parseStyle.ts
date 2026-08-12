import { camelCase } from './camelCase'

type Style = string | Partial<CSSStyleDeclaration>

/**
 * Converts a CSS Style string
 * @param {string | Partial<CSSStyleDeclaration>} style A string to convert, or object to return
 * @returns {Partial<CSSStyleDeclaration>} a partial CSSStyleDeclaration
 */
export const parseStyle = (style: Style): Partial<CSSStyleDeclaration> | undefined => {
	switch (typeof style) {
	case 'string':
		return style.split(';').filter(r => r)
			.reduce((acc: Record<string, string>, rule) => {
				const name = rule.slice(0, rule.indexOf(':')).trim()
				const value = rule.slice(rule.indexOf(':') + 1).trim()

				acc[camelCase(name)] = value
				return acc
			}, {})
	case 'object':
		return style

	default:
		return undefined
	}
}
