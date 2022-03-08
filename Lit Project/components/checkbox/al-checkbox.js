import { LitElement, html } from "lit";
import styles from './al-checkbox.styles.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { emit } from '../common-function.js'
import { live } from 'lit/directives/live.js'

let id = 0;

export default class AlCheckbox extends LitElement {

  static get styles() {
    return styles;
  }

  get input() {
    return this.renderRoot.querySelector('input[type="checkbox"]');
  }

  static get properties() {
    return {
      /** The checkbox's name attribute. */
      name: { type: String },
      /** The checkbox's value attribute. */
      value: { type: String },
      /** Disables the checkbox. */
      disabled: { type: Boolean, reflect: true },
      /** Makes the checkbox a required field. */
      required: { type: Boolean, reflect: true },
      /** Draws the checkbox in a checked state. */
      checked: { type: Boolean, reflect: true },
      /** This will be true when the control is in an invalid state. Validity is determined by the `required` prop. */
      invalid: { type: Boolean, reflect: true }
    }
  }

  constructor() {
    super();
    this.inputId = `checkbox-${++id}`;
    this.labelId = `checkbox-label-${id}`;
    this.disabled = false;
    this.required = false;
    this.checked = false;
    this.invalid = false;
  }

  handleClick() {
    this.checked = !this.checked;
    emit(this, 'al-change');
  }

  handleBlur() {
    emit(this, 'al-blur');
  }

  handleFocus() {
    emit(this, 'al-focus');
  }

  /** Checks for validity and shows the browser's validation message if the control is invalid. */
  reportValidity() {
    return this.input.reportValidity();
  }

  /** Sets a custom validation message. If `message` is not empty, the field will be considered invalid. */
  setCustomValidity(message) {
    this.input.setCustomValidity(message);
    this.invalid = !this.input.checkValidity();
  }

  render() {
    return html`
          <label
            part="base"
            class=${classMap({
      checkbox: true,
      'checkbox--disabled': this.disabled,
    })}
            for=${this.inputId}
          >
            <input
              id=${this.inputId}
              type="checkbox"
              name=${ifDefined(this.name)}
              value=${ifDefined(this.value)}
              .disabled=${this.disabled}
              .checked=${live(this.checked)}
              .required=${this.required}
              aria-checked=${this.checked ? 'true' : 'false'}
              aria-labelledby=${this.labelId}
              role="checkbox"
              @click=${this.handleClick}
              @blur=${this.handleBlur}
              @focus=${this.handleFocus}
            />
    
            <span id=${this.labelId}>
              <slot></slot>
            </span>
          </label>
        `;
  }
}

customElements.define('al-checkbox', AlCheckbox)