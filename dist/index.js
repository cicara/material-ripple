(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.MaterialRipple = {}));
}(this, (function (exports) { 'use strict';

    class Ripple {
        constructor(options) {
            this.options = Object.assign({
                color: 'rgba(0, 0, 0, 0.1)',
                centered: false,
                unbounded: false,
                exitDuration: 1024,
                enterDuration: 512,
            }, options);
            this.onElementPointerDown = this.onElementPointerDown.bind(this);
            this.init();
        }
        get element() {
            return this.options.element;
        }
        destroy() {
            this.element.classList.remove('material-ripple', 'material-ripple--unbounded');
            this.element.removeEventListener('pointerdown', this.onElementPointerDown);
        }
        init() {
            this.injectStyles();
            this.element.classList.add('material-ripple');
            this.options.unbounded && this.element.classList.add('material-ripple--unbounded');
            this.element.addEventListener('pointerdown', this.onElementPointerDown);
        }
        onElementPointerDown(event) {
            const ripple = this.createRipple(event);
            this.element.addEventListener('pointerup', () => {
                this.removeRipple(ripple);
            }, { once: true });
            this.element.addEventListener('pointerleave', () => {
                this.removeRipple(ripple);
            }, { once: true });
        }
        createRipple(event) {
            let scale;
            const { clientX: x, clientY: y } = event;
            const ripple = document.createElement('div');
            const style = ripple.style;
            style.width = '100px';
            style.height = '100px';
            style.margin = '-50px 0px 0px -50px';
            style.zIndex = this.options.zIndex ? `${this.options.zIndex}` : 'inhert';
            style.opacity = '1';
            style.position = 'absolute';
            style.transform = 'scale(0.2)';
            style.background = `${this.options.color}`;
            style.borderRadius = '50%';
            style.pointerEvents = 'none';
            style.transition = `transform ${this.options.enterDuration}ms ease-out 0s, opacity ${this.options.exitDuration}ms ease-out ${this.options.enterDuration / 2}ms`;
            this.element.appendChild(ripple);
            const { width, height, top, left, right, bottom } = this.element.getBoundingClientRect();
            if (this.options.centered) {
                style.top = `${height / 2}px`;
                style.left = `${width / 2}px`;
                scale = (2 * Math.sqrt((width / 2) ** 2 + (height / 2) ** 2)) / 100;
            }
            else {
                style.top = `${y - top}px`;
                style.left = `${x - left}px`;
                scale = (2 * Math.sqrt(Math.max(x - left, right - x) ** 2 + Math.max(y - top, bottom - y) ** 2)) / 100;
            }
            style.transform = `scale(${scale}) translate(0px, 0px)`;
            return ripple;
        }
        removeRipple(ripple) {
            if (!ripple.isConnected) {
                return;
            }
            ripple.addEventListener('transitionend', (event) => {
                event.propertyName === 'opacity' && ripple.remove();
            });
            ripple.style.opacity = '0';
        }
        injectStyles() {
            if (Ripple.style === null) {
                Ripple.style = document.createElement('style');
                Ripple.style.classList.add('material-ripple');
                Ripple.style.innerHTML = `.material-ripple { position: relative; overflow: hidden; } .material-ripple--unbounded { overflow: visible; }`;
                document.head.appendChild(Ripple.style);
            }
        }
    }
    Ripple.style = null;

    exports.Ripple = Ripple;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=index.js.map
