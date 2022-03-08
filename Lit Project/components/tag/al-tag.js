import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js'
import styles from './al-tag.styles.js'
import { emit } from '../common-function.js';

export default class AlTag extends LitElement {
  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      type: { reflect: true },
      size: { reflect: true },
      pill: { type: Boolean, reflect: true },
      removable: { type: Boolean }
    }
  }

  constructor() {
    super();
    this.type = "neutral";
    this.size = "medium";
    this.pill = false;
    this.removable = false;
  }

  handleRemoveClick() {
    emit(this, 'al-remove');
  }

  render() {
    return html`
          <span
            part="base"
            class=${classMap({
      tag: true,

      // Types
      'tag--primary': this.type === 'primary',
      'tag--success': this.type === 'success',
      'tag--neutral': this.type === 'neutral',
      'tag--warning': this.type === 'warning',
      'tag--danger': this.type === 'danger',
      'tag--text': this.type === 'text',

      // Sizes
      'tag--small': this.size === 'small',
      'tag--medium': this.size === 'medium',
      'tag--large': this.size === 'large',

      // Modifers
      'tag--pill': this.pill,
    })}
          >
            <span part="content" class="tag__content">
              <slot></slot>
            </span>
    
            ${this.removable
        ? html`
                  <al-icon
                    name="x-circle-fill"
                    class="tag__remove"
                    @click=${this.handleRemoveClick}
                  ></al-icon>
                `
        : ''}
          </span>
        `;
  }

}
customElements.define("al-tag", AlTag)