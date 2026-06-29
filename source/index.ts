/** This file exists solely to build the index.d.ts file */
import JsxParser from './components/JsxParser'

export type { TProps, SourceInfo } from './components/JsxParser'
export type { ScopedFunction, FunctionProxy } from './helpers/functionProxy'
export { JsxParserError } from './helpers/errorUtilities'
export type { JsxParserErrorType, SourceLocation } from './helpers/errorUtilities'
export default JsxParser
