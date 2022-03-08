import { LitElement, html } from '../../../node_modules/lit/index.js'
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './al-buttom.styles.js'
import { emit } from '../common-function.js'

export default class AlButton extends LitElement {

  static get styles() {
    return styles;
  }

  get button() {
    return this.renderRoot.querySelector('.button');
  }

  static get properties() {
    return {
      type: { reflect: true },
      size: { reflect: true },
      disabled: { type: Boolean, reflect: true },
      submit: { type: Boolean, reflect: true },
      name: { type: String },
      value: { type: String },
      href: { type: String },
      target: { type: String },
      download: { type: String },
      hasLabel: { state: true },
      /** Draws the button with a caret for use with dropdowns, popovers, etc. */
      caret: { type: Boolean, reflect: true },
    }
  }

  constructor() {
    super();
    this.type = 'default';
    this.size = 'medium';
    this.disabled = false;
    this.submit = false;
    this.hasLabel = false;
    this.caret = false;
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange();
  }

  hasSlot(el, name) {
    // Look for a named slot
    if (name) {
      return el.querySelector(`:scope > [slot="${name}"]`) !== null;
    }

    // Look for a default slot
    return [...el.childNodes].some(node => {

      if (node.nodeType === node.TEXT_NODE && node.textContent.trim() !== '') {
        return true;
      }

      if (node.nodeType === node.ELEMENT_NODE) {
        const el = node;
        if (!el.hasAttribute('slot')) {
          return true;
        }
      }

      return false;
    });
  }

  handleSlotChange() {
    this.hasLabel = this.hasSlot(this);
  }

  /** Sets focus on the button. */
  focus(options) {
    this.button.focus(options);
  }

  /** Removes focus from the button. */
  blur() {
    this.button.blur();
  }

  handleBlur() {
    emit(this, 'al-blur');
  }

  handleFocus() {
    emit(this, 'al-focus');
  }

  handleClick(event) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  render() {
    const isLink = this.href ? true : false;

    const interior = html`
  <span part="label" class="button__label">
    <slot @slotchange=${this.handleSlotChange}></slot>
  </span>
  ${this.caret
        ? html`
        <span part="caret" class="button__caret">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      `
        : ''}
    `;

    return isLink
      ? html`
        <a
          part="base"
          class=${classMap({
        button: true,
        'button--default': this.type === 'default',
        'button--primary': this.type === 'primary',
        'button--success': this.type === 'success',
        'button--neutral': this.type === 'neutral',
        'button--warning': this.type === 'warning',
        'button--danger': this.type === 'danger',
        'button--text': this.type === 'text',
        'button--small': this.size === 'small',
        'button--medium': this.size === 'medium',
        'button--large': this.size === 'large',
        'button--caret': this.caret,
        'button--disabled': this.disabled,
        'button--has-label': this.hasLabel,
      })}
          href=${ifDefined(this.href)}
          target=${ifDefined(this.target)}
          download=${ifDefined(this.download)}
          role="button"
          aria-disabled=${this.disabled ? 'true' : 'false'}
          tabindex=${this.disabled ? '-1' : '0'}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          ${interior}
        </a>
      `
      : html`
        <button
          part="base"
          id="custom-button"
          class=${classMap({
        button: true,
        'button--default': this.type === 'default',
        'button--primary': this.type === 'primary',
        'button--success': this.type === 'success',
        'button--neutral': this.type === 'neutral',
        'button--warning': this.type === 'warning',
        'button--danger': this.type === 'danger',
        'button--text': this.type === 'text',
        'button--small': this.size === 'small',
        'button--medium': this.size === 'medium',
        'button--large': this.size === 'large',
        'button--caret': this.caret,
        'button--disabled': this.disabled,
        'button--has-label': this.hasLabel,
      })}
          ?disabled=${this.disabled}
          type=${this.submit ? 'submit' : 'button'}
          name=${ifDefined(this.name)}
          value=${ifDefined(this.value)}
          @blur=${this.handleBlur}
          @focus=${this.handleFocus}
          @click=${this.handleClick}
        >
          ${interior}
        </button>
      `;
  }

}

customElements.define('al-button', AlButton)