import * as AcornJSX from 'acorn-jsx';
export type JsxParserErrorType = 'parse' | 'unsupported-function' | 'function-parse' | 'function-runtime' | 'call' | 'chain' | 'member-access' | 'blacklisted-tag' | 'unrecognized-component' | 'unrecognized-tag';
export interface SourceLocation {
    line: number;
    column?: number;
    startOffset?: number;
    endOffset?: number;
}
export interface SourceInfo {
    fileName?: string;
    source: string;
    location: SourceLocation;
    loopIndex: number | undefined;
    astNode?: AcornJSX.Expression;
}
export declare class JsxParserError extends Error {
    type: JsxParserErrorType;
    sourceInfo: SourceInfo;
    snippet?: string;
    cause?: unknown;
    constructor(message: string, fields: {
        type: JsxParserErrorType;
        sourceInfo: SourceInfo;
        snippet?: string;
        cause?: unknown;
    });
}
export declare function trimExcessLeadingWhitespaceFromCodeLines(lines: string[]): string[];
export declare function getLocationFromOffsets(source: string, start: number, end: number): SourceLocation;
export declare function buildErrorFromOffsets({ type, message, source, start, end, fileName, cause, astNode, loopIndex }: {
    type: JsxParserErrorType;
    message: string;
    source: string;
    start: number;
    end: number;
    fileName?: string;
    cause?: unknown;
    astNode?: AcornJSX.Expression;
    loopIndex?: number;
}): JsxParserError;
export declare function buildErrorFromLine(opts: {
    type: JsxParserErrorType;
    message: string;
    bodyLines: string[];
    line: number;
    functionName?: string;
    fileName?: string;
    cause?: unknown;
}): JsxParserError;
export declare function sanitizeHtml(html: string): string;
