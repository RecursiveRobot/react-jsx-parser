/// The categories of errors that can be surfaced to the consumer's `onError` callback.
/// Each value corresponds to a distinct failure site within the parser.
export type JsxParserErrorType =
	| 'parse' // The JSX could not be parsed (Acorn SyntaxError)
	| 'unsupported-function' // Async/generator arrow functions are not supported
	| 'function-parse' // A function body could not be transpiled
	| 'function-runtime' // A block-bodied function threw at runtime
	| 'call' // A CallExpression threw while being invoked
	| 'chain' // A ChainExpression threw while being resolved
	| 'member-access' // A MemberExpression could not be resolved
	| 'blacklisted-tag' // The tag is blacklisted and will not be rendered
	| 'unrecognized-component' // The component is unrecognized (componentsOnly mode)
	| 'unrecognized-tag' // The tag is unrecognized in this browser

/// The position of an error within the consumer's original source.
export interface SourceLocation {
	/// 1-based line number within the source.
	line: number
	/// 0-based column within the line.
	column?: number
	/// Character offset for the start of the relevant source code section (from the start of the JSX template).
	startOffset?: number
	/// Character offset for the end of the relevant source code section (from the start of the JSX template).
	endOffset?: number
}

/// A structured error surfaced to the consumer's `onError` callback.
///
/// It extends the native `Error` (so existing consumers reading `.message`/`.stack`
/// continue to work, and `instanceof Error` holds), while exposing the failure
/// category, position, and offending source code as discrete fields for further
/// processing on the receiving side.
export class JsxParserError extends Error {
	type: JsxParserErrorType
	location?: SourceLocation
	/// The name of the file the JSX originated from, when supplied via the `fileName` prop.
	fileName?: string
	/// The framed, `>>> `-highlighted snippet (offending line +/- 2 context lines).
	snippet?: string
	/// The raw offending source code (the relevant slice or line).
	source?: string
	/// The original error/value that triggered this error, when one exists.
	cause?: unknown

	constructor(
		message: string,
		fields: {
			type: JsxParserErrorType,
			location?: SourceLocation,
			fileName?: string,
			snippet?: string,
			source?: string,
			cause?: unknown,
		},
	) {
		super(message)
		this.name = 'JsxParserError'
		this.type = fields.type
		this.location = fields.location
		this.fileName = fields.fileName
		this.snippet = fields.snippet
		this.source = fields.source
		this.cause = fields.cause
		// Restore the prototype chain so `instanceof JsxParserError` survives transpilation.
		Object.setPrototypeOf(this, JsxParserError.prototype)
	}
}

/// Removes the common leading whitespace shared by all code lines, so that the
/// rendered snippet is not needlessly indented.  Lines beginning with `{` (the
/// function's opening brace) are excluded from the minimum calculation.
export function trimExcessLeadingWhitespaceFromCodeLines(lines: string[]): string[] {
	const minLeadingWhitespace: number | undefined = lines
		.filter(l => !l.startsWith('{'))
		.reduce((min, line) => {
			const leadingWhitespace = line.match(/^(\s*)\S+/)?.[1]
			return leadingWhitespace ? Math.min(leadingWhitespace.length, min ?? Infinity) : min
		}, undefined as number | undefined)
	// eslint-disable-next-line no-confusing-arrow
	return lines.map(line => line.replace(new RegExp(`^\\s{${minLeadingWhitespace ?? 0}}`), ''))
}

/// Builds the framed, `>>> `-highlighted code snippet for the given (1-based) target
/// line, including up to 2 lines of context on each side.
function buildSnippet(lines: string[], targetLine: number): string {
	const contextStart = Math.max(0, targetLine - 3)
	const contextEnd = Math.min(lines.length, targetLine + 2)
	const codeContext = lines
		.slice(contextStart, contextEnd)
		.map((line, index) => {
			const lineNum = contextStart + index + 1
			const marker = lineNum === targetLine ? '>>> ' : '    '
			return `${marker}${lineNum}: ${line}`
		})
		.join('\n')
	return `~~~jsx\n${codeContext}\n~~~`
}

/// Assembles the human-readable message that is stored on `error.message`.
/// It comprises the readable text, an `Error occurred ...` header, and the snippet.
function buildMessage(readableMessage: string, header: string, snippet: string): string {
	return `**${readableMessage}**\n\n${header}\n${snippet}`
}

/// Derives the `{ line, column, startOffset, endOffset }` location of an expression
/// within a source string from its character offsets.  Shared by error construction
/// and template-metadata injection.
export function getLocationFromOffsets(
	source: string,
	start: number,
	end: number,
): SourceLocation {
	const safeStart = Math.max(0, start)
	const before = source.slice(0, safeStart)
	const line = before.split('\n').length
	const column = safeStart - (before.lastIndexOf('\n') + 1)
	return {
		line,
		column,
		startOffset: safeStart,
		endOffset: Math.max(safeStart, end),
	}
}

/// Builds a `JsxParserError` from a source string and the character offsets of the
/// offending expression within it.  Derives the line/column from the offsets.
export function buildErrorFromOffsets({ type, message, source, start, end, fileName, cause }: {
	type: JsxParserErrorType,
	message: string,
	source: string,
	start: number,
	end: number,
	fileName?: string,
	cause?: unknown,
}): JsxParserError {
	const location = getLocationFromOffsets(source, start, end)

	const snippet = buildSnippet(source.split('\n'), location.line)
	const header = `Error occurred at line \`${location.line}\`${fileName ? ` of \`${fileName}\`` : ''}:`

	return new JsxParserError(buildMessage(message, header, snippet), {
		type,
		location,
		fileName,
		snippet,
		source: source.slice(location.startOffset!, location.endOffset!),
		cause,
	})
}

/// Builds a `JsxParserError` from a pre-split source body and a (1-based) line
/// number.  Used for runtime errors within block-bodied functions, where the line
/// is derived from the stack trace rather than from character offsets.
export function buildErrorFromLine(opts: {
	type: JsxParserErrorType,
	message: string,
	bodyLines: string[],
	line: number,
	functionName?: string,
	fileName?: string,
	cause?: unknown,
}): JsxParserError {
	const { type, message, bodyLines, line, functionName, fileName, cause } = opts
	const snippet = buildSnippet(bodyLines, line)
	const locationRef = `line \`${line}\`${fileName ? ` of \`${fileName}\`` : ''}`
	const header = functionName
		? `Error occurred in dynamic function \`${functionName}\` at ${locationRef}:`
		: `Error occurred at ${locationRef}:`

	return new JsxParserError(buildMessage(message, header, snippet), {
		type,
		location: { line },
		fileName,
		snippet,
		source: bodyLines[line - 1],
		cause,
	})
}

export function sanitizeHtml(html: string): string {
	const map: Record<string, string> = {
		'&': '&amp;',
		'<': '&lt;',
		'>': '&gt;',
		'"': '&quot;',
		"'": '&#039;',
	}
	return html.replace(/[&<>"']/g, match => map[match])
}
