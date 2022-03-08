import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-tab.styles.js';
import { emit } from "../common-function.js";
import { classMap } from "../../../node_modules/lit/directives/class-map.js";
import '../icon/al-icon.js';

let id = 0;

export default class AlTab extends LitElement {

    get tab() {
        return this.renderRoot.querySelector('.tab');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** The name of the tab panel the tab will control. The panel must be located in the same tab group. */
            panel: { type: String, reflect:true },
            /** Draws the tab in an active state. */
            active: { type: Boolean, reflect: true },
            /** Makes the tab closable and shows a close icon. */
            closable: { type: Boolean },
            /** Draws the tab in a disabled state. */
            disabled: { type: Boolean, reflect: true }
        }
    }

    constructor() {
        super();
        this.componentId = `tab-${++id}`;
        this.panel = '';
        this.active = false;
        this.closable = false;
        this.disabled = false;
        this.id = this.id || this.componentId;
    }

    handleCloseClick() {
        emit(this, 'al-close');
    }

    /** Sets focus to the tab. */
    focus(options) {
        this.tab.focus(options);
    }

    /** Removes focus from the tab. */
    blur() {
        this.tab.blur();
    }

    render() {
        return html`
          <div
            part="base"
            class=${classMap({
            tab: true,
            'tab--active': this.active,
            'tab--closable': this.closable,
            'tab--disabled': this.disabled
        })}
            role="tab"
            aria-disabled=${this.disabled ? 'true' : 'false'}
            aria-selected=${this.active ? 'true' : 'false'}
            tabindex=${this.disabled || !this.active ? '-1' : '0'}
          >
            <slot></slot>
            ${this.closable
                ? html`
                  <al-icon
                    name="x"
                    class="tab__close-button"
                    @click=${this.handleCloseClick}
                    tabindex="-1"
                  ></al-icon>
                `
                : ''}
          </div>
        `;
    }


}
customElements.define('al-tab', AlTab);