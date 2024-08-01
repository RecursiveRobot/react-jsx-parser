/* eslint-disable no-use-before-define */
declare module 'acorn-jsx' {
	export interface BaseExpression {
		start: number;
		end: number;
	}

	export interface JSXAttribute extends BaseExpression {
		type: 'JSXAttribute';
		elements?: Expression[];
		expression?: null | Expression;
		name: { name: string };
		value: Expression;
	}

	export interface JSXAttributeExpression extends BaseExpression {
		type: 'JSXAttributeExpression';
		argument?: Expression;
	}

	export interface JSXFragment {
		children: JSXElement[],
		end: number,
		openingFragment: OpeningElement,
		start: number,
		type: 'JSXFragment',
	}

	export interface OpeningElement extends JSXElement {
		attributes: JSXAttribute[];
	}

	export interface JSXElement extends BaseExpression {
		type: 'JSXElement';
		children: JSXElement[];
		openingElement: OpeningElement;
		name: JSXIdentifier | JSXMemberExpression;
	}

	export interface JSXExpressionContainer extends BaseExpression {
		type: 'JSXExpressionContainer';
		expression: Expression;
	}

	export interface JSXIdentifier extends BaseExpression {
		type: 'JSXIdentifier';
		name: string;
	}

	export interface JSXMemberExpression extends BaseExpression {
		type: 'JSXMemberExpression';
		object: JSXIdentifier | JSXMemberExpression;
		property: JSXIdentifier | JSXMemberExpression;
	}

	export interface JSXSpreadAttribute extends BaseExpression {
		type: 'JSXSpreadAttribute';
		argument: Identifier;
	}

	export interface JSXText extends BaseExpression {
		type: 'JSXText';
		value: string;
	}

	export interface ArrayExpression extends BaseExpression {
		type: 'ArrayExpression';
		elements: Array<Expression | SpreadElement>;
	}

	export interface ArrowFunctionExpression extends BaseExpression {
		type: 'ArrowFunctionExpression';
		async: Boolean
		generator: Boolean
		expression: true;
		argument?: Expression;
		body: BlockStatement | Expression
		params: Pattern[]
	}

	export interface BinaryExpression extends BaseExpression {
		type: 'BinaryExpression';
		left: Expression;
		operator: string;
		right: Expression;
	}

	export interface BlockStatement extends BaseExpression {
		type: 'BlockStatement';
		end: number;
	}

	export interface CallExpression extends BaseExpression {
		type: 'CallExpression';
		arguments: Expression[];
		callee: Expression;
		optional: boolean;
	}

	export interface ChainExpression extends BaseExpression {
		type: 'ChainExpression';
		expression: MemberExpression | CallExpression;
	}

	export interface ConditionalExpression extends BaseExpression {
		type: 'ConditionalExpression';
		alternate: Expression;
		consequent: Expression;
		test: Expression;
	}

	export interface ExpressionStatement extends BaseExpression {
		type: 'ExpressionStatement';
		expression: Expression;
	}

	export interface Identifier extends BaseExpression {
		type: 'Identifier';
		name: string;
	}

	export interface Literal extends BaseExpression {
		type: 'Literal';
		value: string;
	}

	export interface LogicalExpression extends BaseExpression {
		type: 'LogicalExpression';
		left: Expression;
		operator: string;
		right: Expression;
	}

	export interface MemberExpression extends BaseExpression {
		type: 'MemberExpression';
		computed: boolean;
		name?: string;
		object: Literal | MemberExpression;
		property?: Identifier | MemberExpression;
		raw?: string;
		optional: boolean;
	}

	export interface NewExpression extends BaseExpression {
		type: 'NewExpression';
		callee: Expression;
		arguments: any[];
	}

	export interface Property extends BaseExpression {
		type: 'Property'
		key: Expression
		value: Expression
		kind: 'init' | 'get' | 'set'
		method: boolean
		shorthand: boolean
		computed: boolean
	}

	export interface SpreadElement extends BaseExpression {
		type: 'SpreadElement';
		argument: Expression;
	}

	export interface ObjectExpression extends BaseExpression {
		type: 'ObjectExpression';
		properties: Array<Property | SpreadElement>;
	}

	export interface TemplateElement extends BaseExpression {
		type: 'TemplateElement';
		value: { cooked: string };
	}

	export interface TemplateLiteral extends BaseExpression {
		type: 'TemplateLiteral';
		expressions: Expression[];
		quasis: Expression[];
	}

	export interface ThisExpression extends BaseExpression {
		type: 'ThisExpression'
	}

	export type UnaryOperator = '-' | '+' | '!' | '~' | 'typeof' | 'void' | 'delete'

	export interface UnaryExpression extends BaseExpression {
		type: 'UnaryExpression';
		operator: UnaryOperator;
		prefix: boolean;
		argument: Expression;
	}

	export type Expression =
	| JSXAttribute
	| JSXAttributeExpression
	| JSXElement
	| JSXExpressionContainer
	| JSXSpreadAttribute
	| JSXFragment
	| JSXText
	| ArrayExpression
	| ArrowFunctionExpression
	| BinaryExpression
	| BlockStatement
	| CallExpression
	| ChainExpression
	| ConditionalExpression
	| ExpressionStatement
	| Identifier
	| Literal
	| LogicalExpression
	| MemberExpression
	| NewExpression
	| ObjectExpression
	| ThisExpression
	| TemplateElement
	| TemplateLiteral
	| UnaryExpression

	export interface AssignmentProperty extends Node {
		type: 'Property'
		key: Identifier
		value: Pattern
		kind: 'init'
		method: false
		shorthand: boolean
		computed: boolean
	}

	export interface ObjectPattern extends BaseExpression {
		type: 'ObjectPattern'
		properties: Array<AssignmentProperty | RestElement>
	}

	export interface ArrayPattern extends BaseExpression {
		type: 'ArrayPattern'
		elements: Array<Pattern | null>
	}

	export interface RestElement extends BaseExpression {
		type: 'RestElement'
		argument: Identifier
	}

	export interface AssignmentPattern extends BaseExpression {
		type: 'AssignmentPattern'
		left: Identifier
		right: Expression
	}

	export type Pattern =
	| Identifier
	| MemberExpression
	| ObjectPattern
	| ArrayPattern
	| RestElement
	| AssignmentPattern

	interface PluginOptions {
		allowNamespacedObjects?: boolean,
		allowNamespaces?: boolean,
		autoCloseVoidElements?: boolean,
	}
	export default function(options?: PluginOptions): any
}
/* eslint-enable no-use-before-define */
