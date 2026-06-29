import { default as React, ComponentType, ExoticComponent } from 'react';
import { JsxParserError, SourceLocation } from '../helpers/errorUtilities';
import * as AcornJSX from 'acorn-jsx';
export type TProps = {
    allowUnknownElements?: boolean;
    autoCloseVoidElements?: boolean;
    bindings?: {
        [key: string]: unknown;
    };
    blacklistedAttrs?: Array<string | RegExp>;
    blacklistedTags?: string[];
    className?: string;
    components?: Record<string, ComponentType | ExoticComponent>;
    componentsOnly?: boolean;
    disableFragments?: boolean;
    disableKeyGeneration?: boolean;
    fileName?: string;
    jsx?: string;
    onError?: (error: JsxParserError) => void;
    showWarnings?: boolean;
    renderError?: (props: {
        error: string;
    }) => React.JSX.Element | null;
    renderInWrapper?: boolean;
    renderUnrecognized?: (tagName: string) => React.JSX.Element | null;
};
export interface SourceInfo {
    fileName?: string;
    source: string;
    location: SourceLocation;
    loopIndex: number | undefined;
    astNode: AcornJSX.Expression;
}
export default class JsxParser extends React.Component<TProps> {
    #private;
    static displayName: string;
    static defaultProps: TProps;
    private ParsedChildren;
    private lastAttributeName;
    jsx: string;
    render: () => React.JSX.Element;
}
