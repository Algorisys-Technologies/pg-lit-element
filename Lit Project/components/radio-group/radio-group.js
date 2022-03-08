import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js';
import styles from './radio-group.styles.js';

export default class AlRadioGroup extends LitElement {

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** Shows the fieldset and legend that surrounds the radio group. */
            fieldset: { type: Boolean, attribute: 'fieldset' },
            /** The radio group label. Required for proper accessibility. Alternatively, you can use the label slot. */
            label: { type: String }
        }
    }

    constructor() {
        super();
        this.fieldset = false;
        this.label = '';
    }

    render() {
        return html`
        <fieldset
        part="base"
        class=${classMap({
            'radio-group': true,
            'radio-group--has-fieldset': this.fieldset
        })}
        role="radiogroup"
      >
        <legend part="label" class="radio-group__label">
         ${this.label}
        </legend>
        <slot></slot>
      </fieldset>
    `;
    }

}
customElements.define('al-radio-group', AlRadioGroup)