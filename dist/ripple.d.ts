export interface RippleOptions {
    color?: string;
    zIndex?: number;
    element: HTMLElement;
    centered?: boolean;
    unbounded?: boolean;
    exitDuration?: number;
    enterDuration?: number;
}
export declare class Ripple {
    private static style;
    private options;
    private get element();
    constructor(options: RippleOptions);
    destroy(): void;
    private init;
    private onElementPointerDown;
    private createRipple;
    private removeRipple;
    private injectStyles;
}
