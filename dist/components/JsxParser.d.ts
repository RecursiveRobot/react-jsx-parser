import { default as React, ComponentType, ExoticComponent } from 'react';
import { JsxParserError } from '../helpers/errorUtilities';
import { ProfileData } from '../helpers/profilerUtilities';
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
    onProfile?: (data: ProfileData) => void;
    profileReactRender?: boolean;
    renderError?: (props: {
        error: string;
    }) => React.JSX.Element | null;
    renderInWrapper?: boolean;
    renderUnrecognized?: (tagName: string) => React.JSX.Element | null;
};
declare const CycleCorrelationContext: React.Context<{
    current: string | null;
} | null>;
export default class JsxParser extends React.Component<TProps> {
    #private;
    static displayName: string;
    static contextType: React.Context<{
        current: string | null;
    } | null>;
    context: React.ContextType<typeof CycleCorrelationContext>;
    static defaultProps: TProps;
    private ParsedChildren;
    private lastAttributeName;
    jsx: string;
    render: () => React.JSX.Element;
}
export {};
