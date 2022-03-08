import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-spinner.styles.js';

export default class AlSpinner extends LitElement {
    static get styles() {
        return styles;
    }

    render() {
        return html`
          <svg part="base" class="spinner" role="status">
            <circle class="spinner__track"></circle>
            <circle class="spinner__indicator"></circle>
          </svg>
        `;
    }
}
customElements.define('al-spinner', AlSpinner);