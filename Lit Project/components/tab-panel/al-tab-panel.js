import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-tab-panel.styles.js';

let id = 0;

export default class AlTabPanel extends LitElement {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** The tab panel's name. */
            name: { type: String, reflect: true },
            /** When true, the tab panel will be shown. */
            active: { type: Boolean, reflect: true }
        }
    }

    constructor() {
        super();
        this.componentId = `tab-panel-${++id}`;
        this.name = '';
        this.active = false;
    }

    connectedCallback() {
        super.connectedCallback();
        this.id = this.id || this.componentId;
    }

    render() {
        this.style.display = this.active ? 'block' : 'none';

        return html`
        <div 
            part="base"
            class="tab-panel"
            role="tabpanel"
            aria-hidden=${this.active ? 'false' : 'true'}
        >
            <slot></slot>
        </div>
        `;
    }
}
customElements.define('al-tab-panel', AlTabPanel);