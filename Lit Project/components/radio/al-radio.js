import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js';
import { ifDefined } from '../../../node_modules/lit/directives/if-defined.js';
import { live } from '../../../node_modules/lit/directives/live.js';
import styles from './al-radio.styles.js';
import { emit } from '../common-function.js';

let id = 0;

export default class AlRadio extends LitElement {

  static get styles() {
    return styles;
  }

  get input() {
    return this.renderRoot.querySelector('input[type="radio"]');
  }

  static get properties() {
    return {
      name: { type: String },
      value: { type: String },
      disabled: { type: Boolean, reflect: true },
      checked: { type: Boolean, reflect: true },
      invalid: { type: Boolean, reflect: true }
    }
  }

  constructor() {
    super();
    this.inputId = `radio-${++id}`;
    this.labelId = `radio-label-${id}`;
    this.disabled = false;
    this.checked = false;
    this.invalid = false;
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

  firstUpdated() {
    this.handleDisabledChange();
  }

  handleDisabledChange() {
    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  handleClick() {
    this.checked = true;
    this.handleCheckedChange();
    emit(this, 'al-change');
  }

  handleCheckedChange() {
    if (this.checked) {
      this.getSiblingRadios().map(radio => (radio.checked = false));
    }
  }

  getSiblingRadios() {
    return this.getAllRadios().filter(radio => radio !== this);
  }

  getAllRadios() {
    const radioGroup = this.closest('al-radio-group');

    // Radios must be part of a radio group
    if (!radioGroup) {
      return [this];
    }

    return [...radioGroup.querySelectorAll('al-radio')].filter(radio => radio.name === this.name);
  }



  render() {
    return html`
        <label
          part="base"
          class=${classMap({
      radio: true,
      'radio--checked': this.checked,
      'radio--disabled': this.disabled,
    })}
          for=${this.inputId}
        >
          <input
            id=${this.inputId}
            class="radio__input"
            type="radio"
            name=${ifDefined(this.name)}
            value=${ifDefined(this.value)}
            .checked=${live(this.checked)}
            .disabled=${this.disabled}
            @click=${this.handleClick}
          />

        <span part="control" class="radio__control">
          <span part="checked-icon" class="radio__icon">
            <svg viewBox="0 0 16 16">
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g fill="currentColor">
                  <circle cx="8" cy="8" r="3"></circle>
                </g>
              </g>
            </svg>
          </span>
        </span>
  
          <span part="label" id=${this.labelId} class="radio__label">
            <slot></slot>
          </span>
        </label>
      `;

  }
}
customElements.define('al-radio', AlRadio);