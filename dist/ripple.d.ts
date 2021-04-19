export interface RippleOptions {
    color?: string;
    zIndex?: number;
    element: HTMLElement;
    centered?: boolean;
    unbounded?: boolean;
    exitDuration?: number;
    enterDuration?: number;
    rippleWrapper?: HTMLElement;
}
export declare class Ripple {
    private static style;
    private options;
    private get element();
    private get rippleWrapper();
    constructor(options: RippleOptions);
    destroy(): void;
    private init;
    private onElementPointerDown;
    private createRipple;
    private removeRipple;
    private injectStyles;
}
