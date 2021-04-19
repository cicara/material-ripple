
export interface RippleOptions {
  color?: string;
  zIndex?: number,
  element: HTMLElement,
  centered?: boolean;
  unbounded?: boolean;
  exitDuration?: number;
  enterDuration?: number;

  rippleWrapper?: HTMLElement;
}

export class Ripple {
  private static style: null | HTMLElement = null;

  private options: RippleOptions;

  private get element() {
    return this.options.element;
  }

  private get rippleWrapper() {
    return this.options.rippleWrapper!;
  }

  constructor(options: RippleOptions) {
    this.options = Object.assign<Partial<RippleOptions>, RippleOptions>(
      {
        color: 'rgba(0, 0, 0, 0.1)',
        centered: false,
        unbounded: false,
        exitDuration: 1024,
        enterDuration: 512,
        rippleWrapper: options.element,
      },
      options,
    );
    this.onElementPointerDown = this.onElementPointerDown.bind(this);
    this.init();
  }

  public destroy() {
    this.element.classList.remove('material-ripple', 'material-ripple--unbounded');
    this.element.removeEventListener('pointerdown', this.onElementPointerDown);
  }

  private init() {
    this.injectStyles();
    this.element.classList.add('material-ripple');
    this.options.unbounded && this.element.classList.add('material-ripple--unbounded');
    this.element.addEventListener('pointerdown', this.onElementPointerDown);
  }

  private onElementPointerDown(event: PointerEvent) {
    const ripple = this.createRipple(event);

    this.element.addEventListener(
      'pointerup',
      () => {
        this.removeRipple(ripple);
      },
      { once: true },
    );
    this.element.addEventListener(
      'pointerleave',
      () => {
        this.removeRipple(ripple);
      },
      { once: true }
    );
  }

  private createRipple(event: PointerEvent) {
    let scale: number;
    const { clientX: x, clientY: y } = event;

    const ripple = document.createElement('div');
    const style = ripple.style;
    style.width = '100px';
    style.height = '100px';
    style.margin = '-50px 0px 0px -50px';
    style.zIndex = this.options.zIndex ? `${ this.options.zIndex }` : 'inhert';
    style.opacity = '1';
    style.position = 'absolute';
    style.transform = 'scale(0.2)';
    style.background = `${ this.options.color }`;
    style.borderRadius = '50%';
    style.pointerEvents = 'none';
    style.transition = `transform ${ this.options.enterDuration }ms ease-out 0s, opacity ${ this.options.exitDuration }ms ease-out ${ this.options.enterDuration! / 2 }ms`;

    this.rippleWrapper.appendChild(ripple);
    const { width, height, top, left, right, bottom } = this.element.getBoundingClientRect();

    if(this.options.centered) {
      style.top = `${ height / 2 }px`;
      style.left = `${ width / 2 }px`;
      scale = (2 * Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)) / 100;
    } else {
      style.top = `${ y - top }px`;
      style.left = `${ x - left }px`;
      scale = (2 * Math.sqrt(Math.max(x - left, right - x) ** 2 + Math.max(y - top, bottom - y) ** 2)) / 100;
    }
    style.transform = `scale(${ scale }) translate(0px, 0px)`;

    return ripple;
  }

  private removeRipple(ripple: HTMLElement) {
    if(!ripple.isConnected) {
      return;
    }
    ripple.addEventListener(
      'transitionend',
      (event) => {
        event.propertyName === 'opacity' && ripple.remove();
      },
    );
    ripple.style.opacity = '0';
  }

  private injectStyles() {
    if(Ripple.style === null) {
      Ripple.style = document.createElement('style');
      Ripple.style.classList.add('material-ripple');
      Ripple.style.innerHTML = `.material-ripple { position: relative; overflow: hidden; } .material-ripple--unbounded { overflow: visible; }`;
      document.head.appendChild(Ripple.style);
    }
  }

}
