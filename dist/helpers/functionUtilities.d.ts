import * as AcornJSX from 'acorn-jsx';
export declare function isSpreadElement(node: AcornJSX.BaseExpression): node is AcornJSX.SpreadElement;
export declare function getClosureBindings(fullExpression: AcornJSX.Expression): string[];
export declare function getRenderFunction(jsx: string, bindings: Record<string, any>, parseExpression: (body: string, exp: AcornJSX.Expression, scope?: Record<string, any>) => any): (args: Record<string, any>) => any;
export declare function getAllJsxElements(code: string): (AcornJSX.JSXElement | AcornJSX.JSXFragment)[];
export declare function transpileFunctionBody(body: string, bindings: Record<string, any>, parseExpression: (jsx: string, exp: AcornJSX.Expression, scope?: Record<string, any>) => any): [string, Record<string, any>];
