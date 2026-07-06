import { JsxParserError } from './errorUtilities';
import * as AcornJSX from 'acorn-jsx';
export declare function isSpreadElement(node: AcornJSX.BaseExpression): node is AcornJSX.SpreadElement;
export declare const RENDER_CONTEXT_PREAMBLE = " const __jsxRenderContext__ = this;\r\n";
export declare function getClosureBindings(fullExpression: AcornJSX.Expression): string[];
export declare function getRenderFunction(jsx: string, bindings: Record<string, any>, parseExpression: (body: string, exp: AcornJSX.Expression, scope?: Record<string, any>, baseOffset?: number) => any, sourceBaseOffset?: number): (args: Record<string, any>) => any;
export declare function getAllJsxElements(code: string): (AcornJSX.JSXElement | AcornJSX.JSXFragment)[];
export declare function transpileFunctionBody(body: string, bindings: Record<string, any>, parseExpression: (jsx: string, exp: AcornJSX.Expression, scope?: Record<string, any>, sourceBaseOffset?: number) => any, mapBodyOffsetToSource?: (bodyOffset: number) => number): [string, Record<string, any>];
export declare function constructFunction(paramNames: string[], body: string, name?: string, onError?: (error: JsxParserError) => void, fileName?: string, mapBodyOffsetToSource?: (bodyOffset: number) => number, sourceText?: string): (...args: any[]) => any;
