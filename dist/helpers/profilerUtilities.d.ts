import { SourceLocation } from './errorUtilities';
export interface ProfilerNodeTiming {
    id: number;
    parentId: number | null;
    depth: number;
    nodeType: string;
    source: string;
    location: SourceLocation;
    startTime: number;
    selfTime: number;
    totalTime: number;
    loopIndex: number | undefined;
    phase?: 'mount' | 'update' | 'nested-update';
    baseDuration?: number;
    commitTime?: number;
    componentName?: string;
}
export interface ProfileData {
    fileName?: string;
    cycleId: string;
    parentCycleId: string | null;
    renderId: number;
    trigger: 'render' | 'callback' | 'react';
    startTime: number;
    totalTime: number;
    nodes: ProfilerNodeTiming[];
    callback?: {
        location: SourceLocation;
        source: string;
        loopIndex: number | undefined;
    };
}
interface ProfilerFrame {
    id: number;
    parentId: number | null;
    depth: number;
    start: number;
    childTime: number;
}
export declare class ProfilerSession {
    #private;
    active: boolean;
    constructor(now?: () => number);
    now(): number;
    nextRenderId(): number;
    begin(): void;
    enter(): ProfilerFrame;
    exit(frame: ProfilerFrame, meta: {
        nodeType: string;
        source: string;
        location: SourceLocation;
        loopIndex: number | undefined;
    }): void;
    end(): {
        renderId: number;
        nodes: ProfilerNodeTiming[];
    };
}
export {};
