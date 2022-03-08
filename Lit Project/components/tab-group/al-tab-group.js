import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-tab-group.styles.js';
import { emit } from "../common-function.js";
import { classMap } from "../../../node_modules/lit/directives/class-map.js";

export default class AlTabGroup extends LitElement {

    get tabGroup() {
        return this.renderRoot.querySelector('.tab-group');
    }

    get body() {
        return this.renderRoot.querySelector('.tab-group__body');
    }

    get nav() {
        return this.renderRoot.querySelector('.tab-group__nav');
    }

    get indicator() {
        return this.renderRoot.querySelector('.tab-group__indicator');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** The placement of the tabs. */
            placement: { type: String },
            /** Disables the scroll arrows that appear when tabs overflow. */
            noScrollControls: { attribute: 'no-scroll-controls', type: Boolean },
            hasScrollControls: { state: true, type: Boolean }
        }
    }

    constructor() {
        super();
        this.tabs = [];
        this.panels = [];
        this.activeTab;
        this.hasScrollControls = false;
        this.placement = 'top';
        this.activation = 'auto';
        this.noScrollControls = false;
        this.resizeObserver;
        this.mutationObserver;
    }

    firstUpdated() {
        this.repositionIndicator();
        this.updateScrollControls();
        this.syncTabsAndPanels();
        this.setAriaLabels();
        this.setActiveTab(this.getActiveTab() || this.tabs[0], { emitEvents: false });
        const el = this.getActiveTab();
        el ? el.focus({ preventScroll: true }) : this.tabs[0].focus({ preventScroll: true });
    }

    setAriaLabels() {
        // Link each tab with its corresponding panel
        this.tabs.map(tab => {
            const panel = this.panels.find(el => el.name === tab.panel);
            if (panel) {
                tab.setAttribute('aria-controls', panel.getAttribute('id'));
                panel.setAttribute('aria-labelledby', tab.getAttribute('id'));
            }
        });
    }

    updateScrollControls() {
        if (this.nav) {
            if (this.noScrollControls) {
                this.hasScrollControls = false;
            } else {
                this.hasScrollControls =
                    ['top', 'bottom'].includes(this.placement) && this.nav.scrollWidth > this.nav.clientWidth;
            }
        }
    }

    /** Shows the specified tab panel. */
    show(panel) {
        const tab = this.tabs.find(el => el.panel === panel);

        if (tab) {
            this.setActiveTab(tab, { scrollBehavior: 'smooth' });
        }
    }

    handleClick(event) {
        const target = event.target;
        const tab = target.closest('al-tab');
        const tabGroup = tab?.closest('al-tab-group');

        // Ensure the target tab is in this tab group
        if (tabGroup !== this) {
            return;
        }

        if (tab) {
            this.setActiveTab(tab, { scrollBehavior: 'smooth' });
        }
    }

    setActiveTab(tab, options) {
        options = Object.assign(
            {
                emitEvents: true,
                scrollBehavior: 'auto'
            },
            options
        );

        if (tab && tab !== this.activeTab && !tab.disabled) {
            const previousTab = this.activeTab;
            this.activeTab = tab;

            // Sync active tab and panel
            this.tabs.map(el => (el.active = el === this.activeTab));
            this.panels.map(el => (el.active = el.name === this.activeTab.panel));
            this.syncIndicator();

            // Emit events
            if (options.emitEvents) {
                if (previousTab) {
                    emit(this, 'al-tab-hide', { detail: { name: previousTab.panel } });
                }

                emit(this, 'al-tab-show', { detail: { name: this.activeTab.panel } });
            }
        }
    }

    syncIndicator() {
        if (this.indicator) {
            const tab = this.getActiveTab();

            if (tab) {
                this.indicator.style.display = 'block';
                this.repositionIndicator();
            } else {
                this.indicator.style.display = 'none';
                return;
            }
        }
    }

    getActiveTab() {
        return this.tabs.find(el => el.active);
    }

    repositionIndicator() {
        const currentTab = this.getActiveTab();

        if (!currentTab) {
            return;
        }

        const width = currentTab.clientWidth;
        const height = currentTab.clientHeight;
        const offset = this.getOffset(currentTab, this.nav);
        const offsetTop = offset.top + this.nav.scrollTop;
        const offsetLeft = offset.left + this.nav.scrollLeft;

        switch (this.placement) {
            case 'top':
            case 'bottom':
                this.indicator.style.width = `${width}px`;
                this.indicator.style.height = 'auto';
                this.indicator.style.transform = `translateX(${offsetLeft}px)`;
                break;

            case 'start':
            case 'end':
                this.indicator.style.width = 'auto';
                this.indicator.style.height = `${height}px`;
                this.indicator.style.transform = `translateY(${offsetTop}px)`;
                break;
        }
    }

    getOffset(element, parent) {
        return {
            top: Math.round(element.getBoundingClientRect().top - parent.getBoundingClientRect().top),
            left: Math.round(element.getBoundingClientRect().left - parent.getBoundingClientRect().left)
        };
    }

    handleKeyDown(event) {
        const target = event.target;
        const tab = target.closest('al-tab');
        const tabGroup = tab?.closest('al-tab-group');

        // Ensure the target tab is in this tab group
        if (tabGroup !== this) {
            return;
        }

        // Move focus left or right
        if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) {
            const activeEl = document.activeElement;

            if (activeEl && activeEl.tagName.toLowerCase() === 'al-tab') {
                let index = this.tabs.indexOf(activeEl);

                if (event.key === 'Home') {
                    index = 0;
                } else if (event.key === 'End') {
                    index = this.tabs.length - 1;
                } else if (
                    (['top', 'bottom'].includes(this.placement) && event.key === 'ArrowLeft') ||
                    (['start', 'end'].includes(this.placement) && event.key === 'ArrowUp')
                ) {
                    index = Math.max(0, index - 1);
                } else if (
                    (['top', 'bottom'].includes(this.placement) && event.key === 'ArrowRight') ||
                    (['start', 'end'].includes(this.placement) && event.key === 'ArrowDown')
                ) {
                    index = Math.min(this.tabs.length - 1, index + 1);
                }

                this.tabs[index].focus({ preventScroll: true });
                this.setActiveTab(this.tabs[index], { scrollBehavior: 'smooth' });
                event.preventDefault();
            }
        }
    }

    handleScrollToStart() {
        this.nav.scroll({
            left: this.nav.scrollLeft - this.nav.clientWidth,
            behavior: 'smooth'
        });
    }

    handleScrollToEnd() {
        this.nav.scroll({
            left: this.nav.scrollLeft + this.nav.clientWidth,
            behavior: 'smooth'
        });
    }

    getAllTabs(includeDisabled = false) {
        const slot = this.shadowRoot.querySelector('slot[name="nav"]');

        return [...slot.assignedElements()].filter(el => {
            return includeDisabled
                ? el.tagName.toLowerCase() === 'al-tab'
                : el.tagName.toLowerCase() === 'al-tab' && !el.disabled
        });
    }

    getAllPanels() {
        const slot = this.body.querySelector('slot');
        return [...slot.assignedElements()].filter((el) => el.tagName.toLowerCase() === 'al-tab-panel');
    }

    // This stores tabs and panels so we can refer to a cache instead of calling querySelectorAll() multiple times.
    syncTabsAndPanels() {
        this.tabs = this.getAllTabs();
        this.panels = this.getAllPanels();
        this.syncIndicator();
    }

    render() {
        return html`
          <div
            part="base"
            class=${classMap({
            'tab-group': true,
            'tab-group--top': this.placement === 'top',
            'tab-group--bottom': this.placement === 'bottom',
            'tab-group--start': this.placement === 'start',
            'tab-group--end': this.placement === 'end',
            'tab-group--has-scroll-controls': this.hasScrollControls
        })}
            @click=${this.handleClick}
            @keydown=${this.handleKeyDown}
          >
            <div class="tab-group__nav-container" part="nav">
              ${this.hasScrollControls
                ? html`
                    <al-icon
                      class="tab-group__scroll-button tab-group__scroll-button--start"
                      name="chevron-left"
                      @click=${this.handleScrollToStart}
                    ></al-icon>
                  `
                : ''}
    
              <div class="tab-group__nav">
                <div part="tabs" class="tab-group__tabs" role="tablist">
                  <div part="active-tab-indicator" class="tab-group__indicator"></div>
                  <slot name="nav" @slotchange=${this.syncTabsAndPanels}></slot>
                </div>
              </div>
    
              ${this.hasScrollControls
                ? html`
                    <al-icon
                      class="tab-group__scroll-button tab-group__scroll-button--end"
                      name="chevron-right"
                      @click=${this.handleScrollToEnd}
                    ></al-icon>
                  `
                : ''}
            </div>
    
            <div part="body" class="tab-group__body">
              <slot @slotchange=${this.syncTabsAndPanels}></slot>
            </div>
          </div>
        `;
    }
}
customElements.define('al-tab-group', AlTabGroup);