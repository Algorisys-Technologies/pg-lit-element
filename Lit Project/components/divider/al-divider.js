import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js'
import styles from './al-divider.styles.js';
import { emit } from '../common-function.js';
import alDividerStyles from './al-divider.styles.js';

export default class AlDivider extends LitElement {

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            vertical: { type: Boolean, reflect: true }
        }
    }

    constructor() {
        super();
        this.vertical = false;
    }

    firstUpdated() {
        this.setAttribute('role', 'separator');
        this.setAttribute('aria-orientation', this.vertical ? 'vertical' : 'horizontal');
    }

    render() {
        return html`
        <div part="base" class="menu-divider"></div>
        `;
    }
}
customElements.define("al-divider", AlDivider);