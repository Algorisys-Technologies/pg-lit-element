import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-textarea.styles.js';
import { emit } from "../common-function.js";
import { classMap } from "../../../node_modules/lit/directives/class-map.js";
import { ifDefined } from '../../../node_modules/lit/directives/if-defined.js';
import { live } from '../../../node_modules/lit/directives/live.js';

let id = 0;

export default class AlTextarea extends LitElement {

    get input() {
        return this.renderRoot.querySelector('.textarea__control');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** The textarea's size. */
            size: { type: String, reflect: true },

            /** The textarea's name attribute. */
            name: { type: String, reflect: true },

            /** The textarea's value attribute. */
            value: {},

            /** Draws a filled textarea. */
            filled: { type: Boolean, reflect: true },

            /** The textarea's label. Alternatively, you can use the label slot. */
            label: { type: String },

            /** The textarea's help text. Alternatively, you can use the help-text slot. */
            helpText: { attribute: 'help-text' },

            /** The textarea's placeholder text. */
            placeholder: { type: String },

            /** The number of rows to display by default. */
            rows: { type: Number },

            /** Controls how the textarea can be resized. */
            resize: { type: String },

            /** Disables the textarea. */
            disabled: { type: Boolean, reflect: true },

            /** Makes the textarea readonly. */
            readonly: { type: Boolean, reflect: true },

            /** The minimum length of input that will be considered valid. */
            minlength: { type: Number },

            /** The maximum length of input that will be considered valid. */
            maxlength: { type: Number },

            /** A pattern to validate input against. */
            pattern: { type: String },

            /** Makes the textarea a required field. */
            required: { type: Boolean, reflect: true },

            /**
             * This will be true when the control is in an invalid state. Validity is determined by props such as `type`,
             * `required`, `minlength`, and `maxlength` using the browser's constraint validation API.
             */
            invalid: { type: Boolean, reflect: true },

            /** The textarea's autocaptialize attribute. */
            autocapitalize: { type: String },

            /** The textarea's autocorrect attribute. */
            autocorrect: { type: String },

            /** The textarea's autocomplete attribute. */
            autocomplete: { type: String },

            /** The textarea's autofocus attribute. */
            autofocus: { type: Boolean },

            /** Enables spell checking on the textarea. */
            spellcheck: { type: Boolean },

            /** The textarea's inputmode attribute. */
            inputmode: { type: String }

        }
    }

    constructor() {
        super();
        this.inputId = `textarea-${++id}`;
        this.hasFocus = false;
        this.size = 'medium';
        this.value = '';
        this.filled = false;
        this.helpText = '';
        this.rows = 4;
        this.resize = 'vertical';
        this.disabled = false;
        this.readonly = false;
        this.required = false;
        this.invalid = false;
    }

    firstUpdated() {
        this.invalid = !this.input.checkValidity();
        this.handleDisabledChange();
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

    /** Sets focus on the textarea. */
    focus(options) {
        this.input.focus(options);
    }

    /** Removes focus from the textarea. */
    blur() {
        this.input.blur();
    }

    /** Selects all the text in the textarea. */
    select() {
        return this.input.select();
    }

    handleChange() {
        this.value = this.input.value;
        this.handleValueChange();
        this.setTextareaHeight();
        emit(this, 'al-change');
    }

    setTextareaHeight() {
        if (this.input) {
            if (this.resize === 'auto') {
                this.input.style.height = 'auto';
                this.input.style.height = this.input.scrollHeight + 'px';
            } else {
                this.input.style.height = undefined;
            }
        }
    }

    handleInput() {
        this.value = this.input.value;
        this.handleValueChange();
        this.setTextareaHeight();
        emit(this, 'al-input');
    }

    handleFocus() {
        this.hasFocus = true;
        emit(this, 'al-focus');
    }

    handleBlur() {
        this.hasFocus = false;
        emit(this, 'al-blur');
    }

    handleValueChange() {
        if (this.input) {
            this.invalid = !this.input.checkValidity();
        }
    }

    handleDisabledChange() {
        // Disabled form controls are always valid, so we need to recheck validity when the state changes
        if (this.input) {
            this.input.disabled = this.disabled;
            this.invalid = !this.input.checkValidity();
        }
    }

    render() {
        return html`
        <label for="${this.inputId}">
            ${this.label ? this.label
                : html`<label for="${this.inputId}"><slot></slot></label>`}
        </label>
        <div
          part="base"
          class=${classMap({
                    textarea: true,
                    'textarea--small': this.size === 'small',
                    'textarea--medium': this.size === 'medium',
                    'textarea--large': this.size === 'large',
                    'textarea--standard': !this.filled,
                    'textarea--filled': this.filled,
                    'textarea--disabled': this.disabled,
                    'textarea--focused': this.hasFocus,
                    'textarea--empty': this.value?.length === 0,
                    'textarea--invalid': this.invalid,
                    'textarea--resize-none': this.resize === 'none',
                    'textarea--resize-vertical': this.resize === 'vertical',
                    'textarea--resize-auto': this.resize === 'auto'
                })}
        >
          <textarea
            part="textarea"
            id=${this.inputId}
            class="textarea__control"
            name=${ifDefined(this.name)}
            .value=${live(this.value)}
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            placeholder=${ifDefined(this.placeholder)}
            rows=${ifDefined(this.rows)}
            minlength=${ifDefined(this.minlength)}
            maxlength=${ifDefined(this.maxlength)}
            autocapitalize=${ifDefined(this.autocapitalize)}
            autocorrect=${ifDefined(this.autocorrect)}
            ?autofocus=${this.autofocus}
            spellcheck=${ifDefined(this.spellcheck)}
            inputmode=${ifDefined(this.inputmode)}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          ></textarea>
        </div>
        <small class="textarea--helptext">${this.helpText ? this.helpText : ''}</small>
      `
    }

}
customElements.define('al-textarea', AlTextarea);