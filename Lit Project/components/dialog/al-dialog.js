import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-dialog.styles.js';
import { classMap } from "../../../node_modules/lit/directives/class-map.js";
import { ifDefined } from '../../../node_modules/lit/directives/if-defined.js';
import {
    emit, isPreventScrollSupported, lockBodyScrolling, unlockBodyScrolling, animateTo, stopAnimations, setDefaultAnimation, getAnimation
} from '../common-function.js';
import '../icon/al-icon.js';

const hasPreventScroll = isPreventScrollSupported();
let id = 0;

export default class AlDialog extends LitElement {

    get dialog() {
        return this.renderRoot.querySelector('.dialog');
    }

    get panel() {
        return this.renderRoot.querySelector('.dialog__panel');
    }

    get overlay() {
        return this.renderRoot.querySelector('.dialog__overlay');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** Indicates whether or not the dialog is open. You can use this in lieu of the show/hide methods. */
            open: { type: Boolean, reflcet: true },
            /**
             * The dialog's label as displayed in the header. You should always include a relevant label even when using
             * `no-header`, as it is required for proper accessibility.
             */
            label: { reflect: true },
            /**
             * Disables the header. This will also remove the default close button, so please ensure you provide an easy,
             * accessible way for users to dismiss the dialog.
             */
            noHeader: { attribute: 'no-header', type: Boolean, reflect: true },
            hasFooter: { state: true }
        }
    }

    constructor() {
        super();
        this.open = false;
        this.label = '';
        this.noHeader = false;
        this.hasFooter = false;
        this.componentId = `dialog-${++id}`;
    }

    connectedCallback() {
        super.connectedCallback();
        this.handleSlotChange();
    }

    firstUpdated() {
        this.dialog.hidden = !this.open;

        if (this.open) {
            lockBodyScrolling(this);
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        unlockBodyScrolling(this);
    }

    /** Hides the dialog */
    hide() {
        if (!this.open) {
            return;
        }

        this.open = false;
        this.handleOpenChange();
        return emit(this, 'al-after-hide');
    }

    /** Shows the dialog. */
    show() {
        if (this.open) {
            return;
        }

        this.open = true;
        this.handleOpenChange();
        return emit(this, 'al-after-show');
    }

    async handleOpenChange() {
        if (this.open) {
            // Show
            emit(this, 'al-show');

            lockBodyScrolling(this);

            await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
            this.dialog.hidden = false;

            // Browsers that support el.focus({ preventScroll }) can set initial focus immediately
            if (hasPreventScroll) {
                const alInitialFocus = emit(this, 'al-initial-focus', { cancelable: true });
                if (!alInitialFocus.defaultPrevented) {
                    this.panel.focus({ preventScroll: true });
                }
            }

            const panelAnimation = getAnimation(this, 'dialog.show');
            const overlayAnimation = getAnimation(this, 'dialog.overlay.show');
            await Promise.all([
                animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
                animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
            ]);

            // Browsers that don't support el.focus({ preventScroll }) have to wait for the animation to finish before initial
            // focus to prevent scrolling issues.
            if (!hasPreventScroll) {
                const alInitialFocus = emit(this, 'al-initial-focus', { cancelable: true });
                if (!alInitialFocus.defaultPrevented) {
                    this.panel.focus({ preventScroll: true });
                }
            }

            emit(this, 'al-after-show');
        } else {
            // Hide
            emit(this, 'al-hide');

            await Promise.all([stopAnimations(this.dialog), stopAnimations(this.overlay)]);
            const panelAnimation = getAnimation(this, 'dialog.hide');
            const overlayAnimation = getAnimation(this, 'dialog.overlay.hide');
            await Promise.all([
                animateTo(this.panel, panelAnimation.keyframes, panelAnimation.options),
                animateTo(this.overlay, overlayAnimation.keyframes, overlayAnimation.options)
            ]);
            this.dialog.hidden = true;

            unlockBodyScrolling(this);

            emit(this, 'al-after-hide');
        }
    }

    handleKeyDown(event) {
        if (event.key === 'Escape') {
            event.stopPropagation();
            this.requestClose();
        }
    }

    requestClose() {
        const alRequestClose = emit(this, 'al-request-close', { cancelable: true });
        if (alRequestClose.defaultPrevented) {
            const animation = getAnimation(this, 'dialog.denyClose');
            animateTo(this.panel, animation.keyframes, animation.options);

            return;
        }

        this.hide();
    }

    handleSlotChange() {
        this.hasFooter = this.hasSlot(this, 'footer');
    }

    hasSlot(el, name) {
        return el.querySelector(`:scope > [slot="${name}"]`) !== null;
    }

    render() {
        return html`
          <div
            part="base"
            class=${classMap({
            dialog: true,
            'dialog--open': this.open,
            'dialog--has-footer': this.hasFooter
        })}
            @keydown=${this.handleKeyDown}
          >
            <div part="overlay" class="dialog__overlay" @click=${this.requestClose} tabindex="-1"></div>
    
            <div
              part="panel"
              class="dialog__panel"
              role="dialog"
              aria-modal="true"
              aria-hidden=${this.open ? 'false' : 'true'}
              aria-label=${ifDefined(this.noHeader ? this.label : undefined)}
              aria-labelledby=${ifDefined(!this.noHeader ? `${this.componentId}-title` : undefined)}
              tabindex="0"
            >
              ${!this.noHeader
                ? html`
                    <header part="header" class="dialog__header">
                      <span part="title" class="dialog__title" id=${`${this.componentId}-title`}>
                        <slot name="label"> ${this.label || String.fromCharCode(65279)} </slot>
                      </span>
                      <al-icon
                        class="dialog__close"
                        name="x"
                        @click="${this.requestClose}"
                      ></al-icon>
                    </header>
                  `
                : ''}
    
              <div part="body" class="dialog__body">
                <slot></slot>
              </div>
    
              <footer part="footer" class="dialog__footer">
                <slot name="footer" @slotchange=${this.handleSlotChange}></slot>
              </footer>
            </div>
          </div>
        `;
    }
}
customElements.define('al-dialog', AlDialog);

setDefaultAnimation('dialog.show', {
    keyframes: [
        { opacity: 0, transform: 'scale(0.8)' },
        { opacity: 1, transform: 'scale(1)' }
    ],
    options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.hide', {
    keyframes: [
        { opacity: 1, transform: 'scale(1)' },
        { opacity: 0, transform: 'scale(0.8)' }
    ],
    options: { duration: 250, easing: 'ease' }
});

setDefaultAnimation('dialog.denyClose', {
    keyframes: [{ transform: 'scale(1)' }, { transform: 'scale(1.02)' }, { transform: 'scale(1)' }],
    options: { duration: 250 }
});

setDefaultAnimation('dialog.overlay.show', {
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
    options: { duration: 250 }
});

setDefaultAnimation('dialog.overlay.hide', {
    keyframes: [{ opacity: 1 }, { opacity: 0 }],
    options: { duration: 250 }
});