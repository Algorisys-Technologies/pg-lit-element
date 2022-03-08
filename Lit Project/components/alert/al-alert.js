import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js'
import styles from './al-alert.styles.js';
import { emit } from '../common-function.js';

export default class AlAlert extends LitElement {
    static get styles() {
        return styles;
    }

    get base() {
        return this.renderRoot.querySelector('[part="base"]');
    }

    static get properties() {
        return {
            /** Indicates whether or not the alert is open. */
            open: { type: Boolean, reflect: true },

            /** Makes the alert closable. */
            closable: { type: Boolean, reflect: true },

            /** The type of alert. */
            type: { reflect: true },

            /**
            * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
            * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`.
            */
            duration: { type: Number }
        }
    }

    constructor() {
        super();
        this.open = false;
        this.closable = false;
        this.type = 'primary';
        this.duration = Infinity;
        this.autoHideTimeout;
    }

    firstUpdated() {
        this.base.hidden = !this.open;
        this.handleOpenChange();
    }

    /** Shows the alert. */
    show() {
        if (this.open) {
            return;
        }

        this.open = true;
        this.handleOpenChange();
    }

    /** Hides the alert */
    hide() {
        if (!this.open) {
            return;
        }

        this.open = false;
        this.handleOpenChange();
    }

    handleCloseClick() {
        this.hide();
    }

    handleOpenChange() {
        if (this.open) {
            // Show
            emit(this, 'al-show');

            if (this.duration < Infinity) {
                this.restartAutoHide();
            }
            this.base.hidden = false;
            emit(this, 'al-after-show');
        } else {
            // Hide
            emit(this, 'al-hide');
            clearTimeout(this.autoHideTimeout);
            this.base.hidden = true;
            emit(this, 'al-after-hide');
        }
    }

    handleMouseMove() {
        this.restartAutoHide();
    }

    restartAutoHide() {
        clearTimeout(this.autoHideTimeout);
        if (this.open && this.duration < Infinity) {
            this.autoHideTimeout = setTimeout(() => this.hide(), this.duration);
        }
    }

    render() {
        return html`
        <div
        part="base"
        class=${classMap({
            alert: true,
            'alert--primary': this.type === 'primary',
            'alert--success': this.type === 'success',
            'alert--neutral': this.type === 'neutral',
            'alert--warning': this.type === 'warning',
            'alert--danger': this.type === 'danger'
        })}
        role="alert"
        aria-hidden=${this.open ? 'false' : 'true'}
        @mousemove=${this.handleMouseMove}>
        <span part="icon" class="alert__icon">
            <slot name="icon"></slot>
        </span>
        <span part="message" class="alert__message">
          <slot></slot>
        </span>
        ${this.closable ? html`
        <span class="alert__close">
        <al-icon name="x" @click=${this.handleCloseClick}></al-icon>
        `: ''}
        </div>
        `
    }



}
customElements.define('al-alert', AlAlert);