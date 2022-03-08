import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js'
import { ifDefined } from '../../../node_modules/lit/directives/if-defined.js';

import { live } from '../../../node_modules/lit/directives/live.js';
import styles from './al-input.styles.js';
import { emit } from '../common-function.js';
import { data } from './al-data.js'

let id = 0;

export default class AlInput extends LitElement {

    get input() {
        return this.renderRoot.querySelector('.input__control');
    }

    get resultsHTML() {
        return this.renderRoot.querySelector('.results');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            name: { type: String },
            label: { type: String },
            type: { type: String, reflect: true },
            placeholder: { type: String },
            value: { type: String },
            id: { type: String },
            disabled: { type: Boolean, reflect: true },
            required: { type: Boolean, reflect: true },
            readonly: { type: Boolean, reflect: true },
            clearable: { type: Boolean },
            invalid: { type: Boolean, reflect: true },
            togglePassword: { attribute: 'toggle-password', type: Boolean },
            pattern: {},
            isPasswordVisible: { state: true },
            hasFocus: { state: true },
            size: { reflect: true },
            filled: { type: Boolean, reflect: true },
            pill: { type: Boolean, reflect: true },
            helpText: { attribute: 'help-text' }
        }
    }

    constructor() {
        super();
        this.inputId = `input-${++id}`;
        this.type = 'text';
        this.value = "";
        this.disabled = false;
        this.required = false;
        this.readonly = false;
        this.clearable = false;
        this.invalid = false;
        this.togglePassword = false;
        this.isPasswordVisible = false;
        this.hasFocus = false;
        this.size = "medium";
        this.filled = false;
        this.pill = false;
        this.helpText = '';
        this.data = data;
        this.results1 = [];
        this.resultsData = [];
    }

    handleClearClick(event) {
        this.value = '';
        emit(this, 'al-clear');
        emit(this, 'al-input');
        emit(this, 'al-change');
        this.input.focus();
        this.handleValueChange();
        event.stopPropagation();
    }

    handleChange() {
        this.value = this.input.value;
        this.handleValueChange();
        emit(this, 'al-change');
    }

    handleInput() {
        this.value = this.input.value;

        if (this.input.type !== "password") {
            this.results1 = [];
            this.resultsData = this.getResults(this.value)
            if (this.resultsData.length) {
                if (this.value) {
                    if (this.resultsData.length > 5) {
                        this.resultsHTML.style.cursor = "pointer";
                        this.resultsHTML.style.height = "100px";
                        this.resultsHTML.style.overflow = "auto";
                        this.resultsHTML.style.display = "block";
                    }
                    for (let i = 0; i < this.resultsData.length; i++) {
                        this.results1.push(html`<li>${this.resultsData[i]}</li>`);
                    }
                }
            } else {
                this.resultsHTML.style.height = "auto";
                this.resultsHTML.style.overflow = "visible";
            }
        }

        // if (this.input.type !== "password") {
        //     this.resultsHTML.innerHTML = "";
        //     let resultsData = [];
        //     resultsData = this.getResults(this.value)
        //     if (this.value) {
        //         if (resultsData.length > 5) {
        //             this.resultsHTML.style.cursor = "pointer";
        //             this.resultsHTML.style.height = "100px";
        //             this.resultsHTML.style.overflow = "auto";
        //             this.resultsHTML.style.display = "block";
        //         }
        //         for (let i = 0; i < resultsData.length; i++) {
        //             this.resultsHTML.innerHTML += "<li>" + resultsData[i] + "</li>";
        //         }
        //     }
        // }

        this.handleValueChange();
        emit(this, 'al-input');
    }

    handleKeyDown(event) {
        if (event.key === 'Backspace') {
            this.resultsHTML.style.height = "auto";
            this.resultsHTML.style.overflow = "visible";
        }
    }

    handleResultClick(event) {
        this.value = event.target.innerText;
        // this.resultsHTML.innerHTML = "";
        this.results1 = [];
        this.resultsHTML.style.height = "auto";
        this.resultsHTML.style.overflow = "visible";
        this.handleValueChange();
        emit(this, 'al-select');
    }

    /** Selects all the text in the input. */
    select() {
        return this.input.select();
    }

    getResults(input) {
        const results = [];
        for (let i = 0; i < this.data.length; i++) {
            if (input.toLowerCase() === this.data[i].toLowerCase().slice(0, input.length)) {
                results.push(this.data[i]);
            }
        }
        return results;
    }

    handleValueChange() {
        if (this.input) {
            this.invalid = !this.input.checkValidity();
        }
    }

    firstUpdated() {
        this.invalid = !this.input.checkValidity();
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

    handlePasswordToggle() {
        this.isPasswordVisible = !this.isPasswordVisible;
    }

    handleBlur() {
        this.hasFocus = false;
        emit(this, 'al-blur');
    }

    /** Sets focus on the input. */
    focus(options) {
        this.input.focus(options);
    }

    /** Removes focus from the input. */
    blur() {
        this.input.blur();
    }

    handleFocus() {
        this.hasFocus = true;
        emit(this, 'al-focus');
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
                    input: true,
                    // Sizes
                    'input--small': this.size === 'small',
                    'input--medium': this.size === 'medium',
                    'input--large': this.size === 'large',
                    // States
                    'input--pill': this.pill,
                    'input--standard': !this.filled,
                    'input--filled': this.filled,
                    'input--disabled': this.disabled,
                    'input--focused': this.hasFocus,
                    'input--empty': this.value?.length === 0,
                    'input--invalid': this.invalid
                })}

        <span part="prefix" class="input__prefix">
            <slot name="prefix"></slot>
        </span>

        <input
            type=${this.type === 'password' && this.isPasswordVisible ? 'text' : this.type}
            class="input__control"
            label=${this.label}
            id=${this.inputId}
            name=${ifDefined(this.name)}
            .value=${live(this.value)} 
            ?disabled=${this.disabled}
            ?readonly=${this.readonly}
            ?required=${this.required}
            pattern=${ifDefined(this.pattern)}
            placeholder=${ifDefined(this.placeholder)}
            @change=${this.handleChange}
            @input=${this.handleInput}
            @blur=${this.handleBlur}
            @focus=${this.handleFocus}
            @keydown=${this.handleKeyDown}
            autocomplete="off"
         />

            ${this.clearable && this.value.length > 0
                ? html`
                <button
                part="clear-button"
                class="input__clear"
                type="button"
                @click=${this.handleClearClick}
                tabindex="-1"> 
                    <slot name="clear-icon">
                        <al-icon name="x-circle-fill"></al-icon>
                    <slot>
              </button>
              `
                : ''
            }

        ${this.togglePassword
                ? html`<button
        part="password-toggle-button"
        class="input__password-toggle"
        type="button"
        @click=${this.handlePasswordToggle}
        tabindex="-1">
        ${this.isPasswordVisible
                        ? html`
        <slot name="show-password-icon">
            <al-icon name="eye-slash"></al-icon>
        </slot> `
                        : html`
        <slot name="hide-password-icon">
            <al-icon name="eye"></al-icon>
        </slot>` }
        </button>
        `: ''}

            <span part="suffix" class="input__suffix">
                <slot name="suffix"></slot>
            </span>
        </div>
        <small class="input--hint">${this.helpText}</small>
        <ul id="results" class="results" @click=${this.handleResultClick}>${this.results1}</ul>
    `;
    }


}

customElements.define('al-input', AlInput)