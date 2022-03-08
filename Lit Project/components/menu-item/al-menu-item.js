import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js';
import styles from './al-menu-item.styles.js'


export default class AlMenuItem extends LitElement {
  static get styles() {
    return styles;
  }

  get menuItem() {
    return this.renderRoot.querySelector('.menu-item');
  }

  static get properties() {
    return {
      checked: { type: Boolean, reflect: true },
      disabled: { type: Boolean, reflect: true },
      value: { type: String }
    }
  }

  constructor() {
    super();
    this.value = "";
    this.checked = false;
    this.disabled = false;
  }

  firstUpdated() {
    this.setAttribute('role', 'menuitem');
  }

  render() {
    return html`
          <div
            part="base"
            class=${classMap({
      'menu-item': true,
      'menu-item--disabled': this.disabled,
      'menu-item--checked': this.checked,
    })}>
          <al-icon
          part="checked-icon"
          class="menu-item__check"
          name="check"
        ></al-icon>
            <span part="prefix" class="menu-item__prefix">
              <slot name="prefix"></slot>
            </span>
            <span part="label" class="menu-item__label">
              <slot></slot>
            </span>
            <span part="suffix" class="menu-item__suffix">
              <slot name="suffix"></slot>
            </span>
          </div>
        `;
  }

}

customElements.define('al-menu-item', AlMenuItem);
