import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js'
import styles from './al-select.styles.js';
import { emit } from '../common-function.js';
import '../dropdown/al-dropdown.js';
import '../menu/al-menu.js';
import '../icon/al-icon.js';
import '../tag/al-tag.js';

let id = 0;

export default class AlSelect extends LitElement {
  static get styles() {
    return styles;
  }

  get dropdown() {
    return this.renderRoot.querySelector('.select');
  }

  get control() {
    return this.renderRoot.querySelector('.select__control');
  }

  get input() {
    return this.renderRoot.querySelector('.select__hidden-select');
  }

  get menu() {
    return this.renderRoot.querySelector('.select__menu');
  }

  static get properties() {
    return {
      multiple: { type: Boolean, reflect: true },
      maxTagsVisible: { attribute: 'max-tags-visible', type: Number },
      disabled: { type: Boolean, reflect: true },
      name: {},
      placeholder: {},
      size: {},
      hoist: { type: Boolean },
      value: { type: String | Array },
      filled: { type: Boolean, reflect: true },
      pill: { type: Boolean, reflect: true },
      required: { type: Boolean, reflect: true },
      clearable: { type: Boolean },
      invalid: { type: Boolean, reflect: true },
      hasFocus: { state: true },
      isOpen: { state: true },
      displayLabel: { state: true },
      displayTags: { state: true },
      label: { type: String, reflect: true },
      helpText: { attribute: "help-text", type: String, reflect: true },

    }
  }

  constructor() {
    super();
    this.inputId = `select-${++id}`;
    this.helpTextId = `select-help-text-${id}`;
    this.labelId = `select-label-${id}`;
    this.resizeObserver;
    this.hasFocus = false;
    this.hasHelpTextSlot = false;
    this.isOpen = false;
    this.displayLabel = '';
    this.displayTags = [];
    this.multiple = false;
    this.maxTagsVisible = 3;
    this.disabled = false;
    this.name = '';
    this.placeholder = '';
    this.size = 'medium';
    this.hoist = false;
    this.value = '';
    this.required = false;
    this.clearable = false;
    this.invalid = false;
    this.filled = false;
    this.pill = false;
    this.label = "";
  }

  connectedCallback() {
    super.connectedCallback();
    this.handleSlotChange = this.handleSlotChange.bind(this);
    this.resizeObserver = new ResizeObserver(() => this.resizeMenu());

    this.updateComplete.then(() => {
      this.resizeObserver.observe(this);
      this.shadowRoot.addEventListener('slotchange', this.handleSlotChange);
      this.syncItemsFromValue();
    });
  }

  firstUpdated() {
    this.invalid = !this.input.checkValidity();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.resizeObserver.unobserve(this);
    this.shadowRoot.removeEventListener('slotchange', this.handleSlotChange);
  }

  handleBlur() {
    // Don't blur if the control is open. We'll move focus back once it closes.
    if (!this.isOpen) {
      this.hasFocus = false;
      emit(this, 'al-blur');
    }
  }

  handleFocus() {
    if (!this.hasFocus) {
      this.hasFocus = true;
      emit(this, 'al-focus');
    }
  }

  resizeMenu() {
    const box = this.shadowRoot?.querySelector('.select__control');
    this.menu.style.width = `${box.clientWidth}px`;

    if (this.dropdown) {
      this.dropdown.reposition();
    }
  }

  handleMenuShow() {
    this.resizeMenu();
    this.isOpen = true;
  }

  handleMenuHide() {
    this.isOpen = false;

    // Restore focus on the box after the menu is hidden
    this.control.focus();
  }

  getItems() {
    return [...this.querySelectorAll('al-menu-item')];
  }

  handleKeyDown(event) {
    const target = event.target;
    const items = this.getItems();

    // Ignore key presses on tags
    if (target.tagName.toLowerCase() === 'al-tag') {
      return;
    }

    // Tabbing out of the control closes it
    if (event.key === 'Tab') {
      if (this.isOpen) {
        this.dropdown.hide();
      }
      return;
    }

  }

  handleClearClick(event) {
    event.stopPropagation();
    this.value = this.multiple ? [] : '';
    emit(this, 'al-clear');
    this.syncItemsFromValue();
  }

  getValueAsArray() {
    // Single selects use '' as an empty selection value, so convert this to [] for an empty multi select
    if (this.multiple && this.value === '') {
      return [];
    }

    return Array.isArray(this.value) ? this.value : [this.value];
  }

  handleTagInteraction(event) {
    // Don't toggle the menu when a tag's clear button is activated
    const path = event.composedPath();
    const clearButton = path.find((el) => {
      if (el instanceof HTMLElement) {
        const element = el;
        return element.classList.contains('tag__remove');
      }
      return false;
    });

    if (clearButton) {
      event.stopPropagation();
    }
  }

  handleDisabledChange() {
    if (this.disabled && this.isOpen) {
      this.dropdown.hide();
    }

    // Disabled form controls are always valid, so we need to recheck validity when the state changes
    if (this.input) {
      this.input.disabled = this.disabled;
      this.invalid = !this.input.checkValidity();
    }
  }

  syncItemsFromValue() {
    this.handleDisabledChange();
    const items = this.getItems();
    const value = this.getValueAsArray();

    // Sync checked states
    items.map(item => (item.checked = value.includes(item.value)));

    // Sync display label and tags
    if (this.multiple) {
      const checkedItems = items.filter(item => value.includes(item.value));

      this.displayLabel = checkedItems[0] ? this.getItemLabel(checkedItems[0]) : '';
      this.displayTags = checkedItems.map((item) => {
        return html`
          <al-tag
            type="neutral"
            size=${this.size}
            ?pill=${this.pill}
            removable
            @click=${this.handleTagInteraction}
            @keydown=${this.handleTagInteraction}
            @al-remove=${(event) => {
            event.stopPropagation();
            if (!this.disabled) {
              item.checked = false;
              this.syncValueFromItems();
            }
          }}
          >
            ${this.getItemLabel(item)}
          </al-tag>
        `;
      });

      if (this.maxTagsVisible > 0 && this.displayTags.length > this.maxTagsVisible) {
        const total = this.displayTags.length;
        this.displayLabel = '';
        this.displayTags = this.displayTags.slice(0, this.maxTagsVisible);
        this.displayTags.push(html`
          <al-tag size=${this.size}> +${total - this.maxTagsVisible} </al-tag>
        `);
      }
    } else {
      const checkedItem = items.filter(item => item.value === value[0])[0];

      this.displayLabel = checkedItem ? this.getItemLabel(checkedItem) : '';
      this.displayTags = [];
    }
  }

  getItemLabel(item) {
    const slot = item.shadowRoot.querySelector('slot:not([name])');
    return this.getTextContent(slot);
  }

  getTextContent(slot) {
    const nodes = slot ? slot.assignedNodes({ flatten: true }) : [];
    let text = '';

    [...nodes].map(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        text += node.textContent;
      }
    });

    return text;
  }

  syncValueFromItems() {
    const items = this.getItems();
    const checkedItems = items.filter(item => item.checked);
    const checkedValues = checkedItems.map(item => item.value);

    if (this.multiple) {
      this.value = (this.value).filter(val => checkedValues.includes(val));
    } else {
      this.value = checkedValues.length > 0 ? checkedValues[0] : '';
    }
    this.handleValueChange();
  }

  handleMenuSelect(event) {
    const item = event.detail.item;

    if (this.multiple) {
      this.value = this.value?.includes(item.value)
        ? (this.value).filter(v => v !== item.value)
        : [...this.value, item.value];
    } else {
      this.value = item.value;
    }

    this.handleValueChange();
  }

  async handleValueChange() {
    this.syncItemsFromValue();
    await this.updateComplete;
    this.invalid = !this.input.checkValidity();
    emit(this, 'al-change');
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

  async handleSlotChange() {
    const items = this.getItems();

    // Check for duplicate values in menu items
    const values = [];
    items.map(item => {
      if (values.includes(item.value)) {
        console.error(`Duplicate value found in <al-select> menu item: '${item.value}'`, item);
      }

      values.push(item.value);
    });

    await Promise.all(items.map(item => item.render)).then(() => this.syncItemsFromValue());
  }


  render() {
    const hasSelection = this.multiple ? this.value?.length > 0 : this.value !== '';

    return html`
    <label for="${this.inputId}">${this.label ? this.label : ''}</label>
            <al-dropdown
              part="base"
              .hoist=${this.hoist}
              .stayOpenOnSelect=${this.multiple}
              .containingElement=${this}
              ?disabled=${this.disabled}
              class=${classMap({
      select: true,
      'select--open': this.isOpen,
      'select--empty': this.value?.length === 0,
      'select--focused': this.hasFocus,
      'select--clearable': this.clearable,
      'select--disabled': this.disabled,
      'select--multiple': this.multiple,
      'select--standard': !this.filled,
      'select--filled': this.filled,
      'select--pill': this.pill,
      'select--has-tags': this.multiple && this.displayTags.length > 0,
      'select--placeholder-visible': this.displayLabel === '',
      'select--small': this.size === 'small',
      'select--medium': this.size === 'medium',
      'select--large': this.size === 'large',
      'select--invalid': this.invalid
    })}
              @al-show=${this.handleMenuShow}
              @al-hide=${this.handleMenuHide}
            >
              <div
                part="control"
                slot="trigger"
                id=${this.inputId}
                class="select__control"
                role="combobox"
                aria-haspopup="true"
                aria-expanded=${this.isOpen ? 'true' : 'false'}
                tabindex=${this.disabled ? '-1' : '0'}
                @blur=${this.handleBlur}
                @focus=${this.handleFocus}
                @keydown=${this.handleKeyDown}
              >
                <span part="prefix" class="select__prefix">
                  <slot name="prefix"></slot>
                </span>
    
                <div class="select__label">
                  ${this.displayTags.length
        ? html` <span part="tags" class="select__tags"> ${this.displayTags} </span> `
        : this.displayLabel || this.placeholder}
                </div>
    
                ${this.clearable && hasSelection
        ? html`
                      <button
                        part="clear-button"
                        class="select__clear"
                        @click=${this.handleClearClick}
                        tabindex="-1"
                      >
                        <slot name="clear-icon">
                          <al-icon name="x-circle-fill"></al-icon>
                        </slot>
                      </button>
                    `
        : ''}
    
                <span part="suffix" class="select__suffix">
                  <slot name="suffix"></slot>
                </span>
    
                <span part="icon" class="select__icon" aria-hidden="true">
                  <al-icon name="chevron-down"></al-icon>
                </span>
    
                <!-- The hidden input tricks the browser's built-in validation so it works as expected. We use an input
                instead of a select because, otherwise, iOS will show a list of options during validation. -->
                <input
                  class="select__hidden-select"
                  aria-hidden="true"
                  ?required=${this.required}
                  .value=${hasSelection ? '1' : ''}
                  tabindex="-1"
                />
              </div>
    
              <al-menu part="menu" class="select__menu" @al-select=${this.handleMenuSelect}>
                <slot @slotchange=${this.handleSlotChange}></slot>
              </al-menu>
            </al-dropdown>
            <small style="opacity:0.5;">${this.helpText ? this.helpText : ''}</small>`

  }
}

customElements.define("al-select", AlSelect)