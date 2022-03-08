import { LitElement, html } from '../../../node_modules/lit-element/lit-element.js';
import { classMap } from '../../../node_modules/lit/directives/class-map.js';
import styles from './al-dropdown.styles.js';
import { createPopper } from '../../../node_modules/@popperjs/core/dist/esm/index.js';
import { emit } from '../common-function.js';

let id = 0;

export function isTabbable(el) {
    const tag = el.tagName.toLowerCase();

    // Elements with a -1 tab index are not tabbable
    if (el.getAttribute('tabindex') === '-1') {
        return false;
    }

    // Elements with a disabled attribute are not tabbable
    if (el.hasAttribute('disabled')) {
        return false;
    }

    // Elements with aria-disabled are not tabbable
    if (el.hasAttribute('aria-disabled') && el.getAttribute('aria-disabled') !== 'false') {
        return false;
    }

    // Radios without a checked attribute are not tabbable
    if (tag === 'input' && el.getAttribute('type') === 'radio' && !el.hasAttribute('checked')) {
        return false;
    }

    // Elements that are hidden have no offsetParent and are not tabbable
    if (!el.offsetParent) {
        return false;
    }

    // Elements without visibility are not tabbable
    if (window.getComputedStyle(el).visibility === 'hidden') {
        return false;
    }

    // Audio and video elements with the controls attribute are tabbable
    if ((tag === 'audio' || tag === 'video') && el.hasAttribute('controls')) {
        return true;
    }

    // Elements with a tabindex other than -1 are tabbable
    if (el.hasAttribute('tabindex')) {
        return true;
    }

    // Elements with a contenteditable attribute are tabbable
    if (el.hasAttribute('contenteditable') && el.getAttribute('contenteditable') !== 'false') {
        return true;
    }

    // At this point, the following elements are considered tabbable
    return ['button', 'input', 'select', 'textarea', 'a', 'audio', 'video', 'summary'].includes(tag);
}

//
// Returns the first and last bounding elements that are tabbable. This is more performant than checking every single
// element because it short-circuits after finding the first and last ones.
//
export function getTabbableBoundary(root) {
    const allElements = [];

    function walk(el) {
        if (el instanceof HTMLElement) {
            allElements.push(el);

            if (el.shadowRoot && el.shadowRoot.mode === 'open') {
                walk(el.shadowRoot);
            }
        }

        [...el.querySelectorAll('*')].map((e) => walk(e));
    }

    // Collect all elements including the root
    walk(root);

    // Find the first and last tabbable elements
    const start = allElements.find(el => isTabbable(el));
    const end = allElements.reverse().find(el => isTabbable(el));

    return { start, end };
}

export default class AlDropdown extends LitElement {
    static get styles() {
        return styles;
    }

    get trigger() {
        return this.renderRoot.querySelector('.dropdown__trigger');
    }

    get panel() {
        return this.renderRoot.querySelector('.dropdown__panel');
    }

    get positioner() {
        return this.renderRoot.querySelector('.dropdown__positioner');
    }

    static get properties() {
        return {
            /** Indicates whether or not the dropdown is open. You can use this in lieu of the show/hide methods. */
            open: { type: Boolean, reflect: true },

            /**
            * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
            * inside of the viewport.
            */
            placement: { type: String },

            /** Disables the dropdown so the panel will not open. */
            disabled: { type: Boolean },

            /**
            * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
            * controls that allow multiple selections.
            */
            stayOpenOnSelect: { attribute: 'stay-open-on-select', type: Boolean, reflect: true },

            /** The dropdown will close when the user interacts outside of this element (e.g. clicking). */
            containingElement: { attribute: false },

            /** The distance in pixels from which to offset the panel away from its trigger. */
            distance: { type: Number },

            /** The distance in pixels from which to offset the panel along its trigger. */
            skidding: { type: Number },

            /**
            * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
            * `overflow: auto|scroll`.
            */
            hoist: { type: Boolean }
        }
    }

    constructor() {
        super();
        this.componentId = `dropdown-${++id}`;
        this.popover;
        this.open = false;
        this.placement = 'bottom-start';
        this.stayOpenOnSelect = false;
        this.disabled = false;
        this.distance = 0;
        this.skidding = 0;
        this.hoist = false;
    }


    connectedCallback() {
        super.connectedCallback();

        this.handlePanelSelect = this.handlePanelSelect.bind(this);
        this.handleDocumentKeyDown = this.handleDocumentKeyDown.bind(this);
        this.handleDocumentMouseDown = this.handleDocumentMouseDown.bind(this);

        if (!this.containingElement) {
            this.containingElement = this;
        }

        // Create the popover after render
        this.updateComplete.then(() => {
            this.popover = createPopper(this.trigger, this.positioner, {
                placement: this.placement,
                strategy: this.hoist ? 'fixed' : 'absolute',
                modifiers: [
                    {
                        name: 'flip',
                        options: {
                            boundary: 'viewport'
                        }
                    },
                    {
                        name: 'offset',
                        options: {
                            offset: [this.skidding, this.distance]
                        }
                    }
                ]
            });
        });
    }

    handlePanelSelect(event) {
        const target = event.target;
        // Hide the dropdown when a menu item is selected
        if (!this.stayOpenOnSelect && target.tagName.toLowerCase() === 'al-menu') {
            this.hide();
            this.focusOnTrigger();
        }
    }

    handleDocumentKeyDown(event) {
        // Close when escape is pressed
        if (event.key === 'Escape') {
            this.hide();
            this.focusOnTrigger();
            return;
        }
    }

    handleDocumentMouseDown(event) {
        // Close when clicking outside of the containing element
        const path = event.composedPath();
        if (!path.includes(this.containingElement)) {
            this.hide();
            return;
        }
    }

    firstUpdated() {
        this.panel.hidden = !this.open;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.hide();
        this.popover.destroy();
    }

    handleTriggerClick() {
        this.open ? this.hide() : this.show();
    }

    /** Shows the dropdown panel. */
    async show() {
        if (this.open) {
            return;
        }
        this.open = true;
        this.handleOpenChange();
    }

    /** Hides the dropdown panel */
    async hide() {
        if (!this.open) {
            return;
        }
        this.open = false;
        this.handleOpenChange();
    }

    handleOpenChange() {
        if (this.disabled) {
            return;
        }
        this.updateAccessibleTrigger();
        if (this.open) {
            // Show
            emit(this, 'al-show');
            this.panel.addEventListener('al-select', this.handlePanelSelect);
            document.addEventListener('keydown', this.handleDocumentKeyDown);
            document.addEventListener('mousedown', this.handleDocumentMouseDown);

            this.popover.update();
            this.panel.hidden = false;
            emit(this, 'al-after-show');
        } else {
            // Hide
            emit(this, 'al-hide');
            this.panel.removeEventListener('al-select', this.handlePanelSelect);
            document.removeEventListener('keydown', this.handleDocumentKeyDown);
            document.removeEventListener('mousedown', this.handleDocumentMouseDown);

            this.panel.hidden = true;
            emit(this, 'al-after-hide');
        }
    }

    /**
  * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
  * is activated.
  */
    reposition() {
        if (!this.open) {
            return;
        }

        this.popover.update();
    }

    focusOnTrigger() {
        const slot = this.trigger.querySelector('slot');
        const trigger = slot.assignedElements({ flatten: true })[0];
        if (trigger && typeof trigger.focus === 'function') {
            trigger.focus();
        }
    }

    handleTriggerKeyDown(event) {
        // Close when escape is pressed
        if (event.key === 'Escape') {
            this.focusOnTrigger();
            this.hide();
            return;
        }

        // When spacebar/enter is pressed, show the panel but don't focus on the menu. This let's the user press the same
        // key again to hide the menu in case they don't want to make a selection.
        if ([' ', 'Enter'].includes(event.key)) {
            event.preventDefault();
            this.open ? this.hide() : this.show();
            return;
        }

    }

    handleTriggerKeyUp(event) {
        // Prevent space from triggering a click event in Firefox
        if (event.key === ' ') {
            event.preventDefault();
        }
    }

    handleTriggerSlotChange() {
        this.updateAccessibleTrigger();
    }

    updateAccessibleTrigger() {
        if (this.trigger) {
            const slot = this.trigger.querySelector('slot');
            const assignedElements = slot.assignedElements({ flatten: true });
            const accessibleTrigger = assignedElements.find(el => getTabbableBoundary(el).start);

            if (accessibleTrigger) {
                accessibleTrigger.setAttribute('aria-haspopup', 'true');
                accessibleTrigger.setAttribute('aria-expanded', this.open ? 'true' : 'false');
            }
        }
    }

    render() {
        return html`
          <div
            part="base"
            id=${this.componentId}
            class=${classMap({
            dropdown: true,
            'dropdown--open': this.open
        })}
          >
            <span
              part="trigger"
              class="dropdown__trigger"
              @click=${this.handleTriggerClick}
              @keydown=${this.handleTriggerKeyDown}
              @keyup=${this.handleTriggerKeyUp}
            >
              <slot name="trigger" @slotchange=${this.handleTriggerSlotChange}></slot>
            </span>
    

            <div class="dropdown__positioner">
              <div
                part="panel"
                class="dropdown__panel"
                aria-hidden=${this.open ? 'false' : 'true'}
                aria-labelledby=${this.componentId}
              >
                <slot></slot>
              </div>
            </div>
          </div>
        `;
    }
}

customElements.define("al-dropdown", AlDropdown)