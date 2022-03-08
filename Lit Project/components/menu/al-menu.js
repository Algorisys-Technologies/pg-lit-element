import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import styles from './al-menu.styles.js';
import { emit } from "../common-function.js";

export default class AlMenu extends LitElement {
    static get styles() {
        return styles;
    }

    get menu() {
        return this.renderRoot.querySelector('.menu');
    }

    get defaultSlot() {
        return this.renderRoot.querySelector('slot')
    }

    constructor() {
        super();
        this.typeToSelectString = '';
        this.typeToSelectTimeout;
    }

    firstUpdated() {
        this.setAttribute('role', 'menu');
    }

    getAllItems(options = { includeDisabled: true }) {
        return [...this.defaultSlot.assignedElements({ flatten: true })].filter((el) => {
            if (el.getAttribute('role') !== 'menuitem') {
                return false;
            }

            if (!options.includeDisabled && el.disabled) {
                return false;
            }

            return true;
        });
    }

    getCurrentItem() {
        return this.getAllItems({ includeDisabled: false }).find(i => i.getAttribute('tabindex') === '0');
    }

    handleClick(event) {
        const target = event.target;
        const item = target.closest('al-menu-item');

        if (item && !item.disabled) {
            emit(this, 'al-select', { detail: { item } });
        }
    }

    setCurrentItem(item) {
        const items = this.getAllItems({ includeDisabled: false });
        let activeItem = item.disabled ? items[0] : item;

        // Update tab indexes
        items.map(i => i.setAttribute('tabindex', i === activeItem ? '0' : '-1'));
    }

    handleMouseDown(event) {
        const target = event.target;

        if (target.getAttribute('role') === 'menuitem') {
            this.setCurrentItem(target);
        }
    }

    handleSlotChange() {
        const items = this.getAllItems({ includeDisabled: false });

        // Reset the roving tab index when the slotted items change
        if (items.length) {
            this.setCurrentItem(items[0]);
        }
    }


    render() {
        return html`
          <div
            part="base"
            class="menu"
            @click=${this.handleClick}
            @mousedown=${this.handleMouseDown}
          >
            <slot @slotchange=${this.handleSlotChange}></slot>
          </div>
        `;
    }
}


customElements.define("al-menu", AlMenu)
