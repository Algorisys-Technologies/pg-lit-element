import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js'
import styles from './al-details.styles.js';
import { emit } from '../common-function.js';
import '../icon/al-icon.js';


let id = 0;

export default class AlDetails extends LitElement {

    get details() {
        return this.renderRoot.querySelector('.details');
    }

    get header() {
        return this.renderRoot.querySelector('.details__header');
    }

    get body() {
        return this.renderRoot.querySelector('.details__body');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** Indicates whether or not the details is open. */
            open: { type: Boolean, reflcet: true },
            /** Disables the details so it can't be toggled. */
            disabled: { type: Boolean, reflect: true },
            /** The summary to show in the details header. If you need to display HTML, use the `summary` slot instead. */
            summary: { type: String }
        }
    }

    constructor() {
        super();
        this.componentId = `details-${++id}`;
        this.open = false;
        this.disabled = false;
    }

    firstUpdated() {
        this.body.hidden = !this.open;
        this.body.style.height = this.open ? 'auto' : '0';
    }

    handleSummaryClick() {
        if (!this.disabled) {
            this.open ? this.hide() : this.show();
            this.header.focus();
        }
    }

    /** Shows the details. */
    show() {
        if (this.open) {
            return;
        }

        this.open = true;
        this.handleOpenChange();
    }

    /** Hides the details */
    hide() {
        if (!this.open) {
            return;
        }

        this.open = false;
        this.handleOpenChange();
    }

    handleSummaryKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.open ? this.hide() : this.show();
        }

        if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
            event.preventDefault();
            this.hide();
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
            event.preventDefault();
            this.show();
        }
    }

    handleOpenChange() {
        if (this.open) {
            emit(this, 'al-show');
            this.body.hidden = false;
            this.body.style.height = 'auto';
        } else {
            emit(this, 'al-hide');
            this.body.hidden = true;
            this.body.style.height = '0';
        }
    }

    render() {
        return html`
        <div
            part="base"
            class=${classMap({
            details: true,
            'details--open': this.open,
            'details--disabled': this.disabled
        })}>
        <header 
            part="header"
            id=${`${this.componentId}-header`}
            class="details__header"
            role="button"
            aria-expanded=${this.open ? 'true' : 'false'}
            aria-controls=${`${this.componentId}-content`}
            aria-disabled=${this.disabled ? 'true' : 'false'}
            tabindex=${this.disabled ? '-1' : '0'}
            @click=${this.handleSummaryClick}
            @keydown=${this.handleSummaryKeyDown}
        >
        <div part="summary" class="details__summary">
            <slot name="summary">${this.summary}</slot>
        </div>

        <span part="summary-icon" class="details__summary-icon">
            <al-icon name="chevron-right"></al-icon>
        </span>
        </header>

        <div class="details__body">
          <div
            part="content"
            id=${`${this.componentId}-content`}
            class="details__content"
            role="region"
            aria-labelledby=${`${this.componentId}-header`}
          >
            <slot></slot>
          </div>
        </div>
    </div>
        `;
    }
}
customElements.define('al-details', AlDetails)