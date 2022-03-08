import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-rating.styles.js';
import { classMap } from "../../../node_modules/lit/directives/class-map.js";
import { unsafeHTML } from '../../../node_modules/lit/directives/unsafe-html.js';
import { styleMap } from "../../../node_modules/lit/directives/style-map.js";
import { emit, clamp } from "../common-function.js";
import '../icon/al-icon.js';

export default class AlRating extends LitElement {

    get rating() {
        return this.renderRoot.querySelector('.rating');
    }

    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** The current rating. */
            value: { type: Number },

            /** The highest rating to show. */
            max: { type: Number },

            /** The minimum increment value allowed by the control. */
            precision: { type: Number },

            /** Makes the rating readonly. */
            readonly: { type: Boolean, reflect: true },

            /** Disables the rating. */
            disabled: { type: Boolean, reflect: true },

            /** The name of the icon to display as the symbol. */
            getSymbol: {},
            hoverValue: { state: true, type: Number },
            isHovering: { type: Boolean },
        }
    }

    constructor() {
        super();
        this.value = 0;
        this.max = 5;
        this.precision = 1;
        this.readonly = false;
        this.disabled = false;
        this.getSymbol = (value) =>
            '<al-icon name="star-fill"></al-icon>';
        this.hoverValue = 0;
        this.isHovering = false;
    }

    /** Sets focus on the rating. */
    focus(options) {
        this.rating.focus(options);
    }

    /** Removes focus from the rating. */
    blur() {
        this.rating.blur();
    }

    handleClick(event) {
        this.setValue(this.getValueFromMousePosition(event));
    }

    setValue(newValue) {
        if (this.disabled || this.readonly) {
            return;
        }

        this.value = newValue === this.value ? 0 : newValue;
        emit(this, 'al-change');
        this.isHovering = false;
    }

    getValueFromMousePosition(event) {
        return this.getValueFromXCoordinate(event.clientX);
    }

    getValueFromXCoordinate(coordinate) {
        const containerLeft = this.rating.getBoundingClientRect().left;
        const containerWidth = this.rating.getBoundingClientRect().width;
        return clamp(
            this.roundToPrecision(((coordinate - containerLeft) / containerWidth) * this.max, this.precision),
            0,
            this.max
        );
    }

    roundToPrecision(numberToRound, precision) {
        const multiplier = 1 / precision;

        return Math.ceil(numberToRound * multiplier) / multiplier;
    }

    handleKeyDown(event) {
        if (this.disabled || this.readonly) {
            return;
        }

        if (event.key === 'ArrowLeft') {
            const decrement = event.shiftKey ? 1 : this.precision;
            this.value = Math.max(0, this.value - decrement);
            emit(this, 'al-change');
            event.preventDefault();
        }

        if (event.key === 'ArrowRight') {
            const increment = event.shiftKey ? 1 : this.precision;
            this.value = Math.min(this.max, this.value + increment);
            emit(this, 'al-change');
            event.preventDefault();
        }

        if (event.key === 'Home') {
            this.value = 0;
            emit(this, 'al-change');
            event.preventDefault();
        }

        if (event.key === 'End') {
            this.value = this.max;
            emit(this, 'al-change');
            event.preventDefault();
        }
    }

    handleMouseEnter() {
        this.isHovering = true;
    }

    handleMouseMove(event) {
        this.hoverValue = this.getValueFromMousePosition(event);
    }

    handleMouseLeave() {
        this.isHovering = false;
    }

    handleTouchStart(event) {
        this.hoverValue = this.getValueFromTouchPosition(event);

        // Prevent scrolling when touch is initiated
        event.preventDefault();
    }

    handleTouchMove(event) {
        this.isHovering = true;
        this.hoverValue = this.getValueFromTouchPosition(event);
    }

    handleTouchEnd(event) {
        this.isHovering = false;
        this.setValue(this.hoverValue);

        // Prevent click on mobile devices
        event.preventDefault();
    }

    getValueFromTouchPosition(event) {
        return this.getValueFromXCoordinate(event.touches[0].clientX);
    }

    render() {
        const counter = Array.from(Array(this.max).keys());
        let displayValue = 0;

        if (this.disabled || this.readonly) {
            displayValue = this.value;
        } else {
            displayValue = this.isHovering ? this.hoverValue : this.value;
        }

        return html`
      <div
        part="base"
        class=${classMap({
            rating: true,
            'rating--readonly': this.readonly,
            'rating--disabled': this.disabled
        })}
        aria-disabled=${this.disabled ? 'true' : 'false'}
        aria-readonly=${this.readonly ? 'true' : 'false'}
        aria-value=${this.value}
        aria-valuemin=${0}
        aria-valuemax=${this.max}
        tabindex=${this.disabled ? '-1' : '0'}
        @click=${this.handleClick}
        @keydown=${this.handleKeyDown}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
        @mousemove=${this.handleMouseMove}
        @touchstart=${this.handleTouchStart}
        @touchend=${this.handleTouchEnd}
        @touchmove=${this.handleTouchMove}
      >
        <span class="rating__symbols rating__symbols--inactive">
          ${counter.map(index => {
            // Users can click the current value to clear the rating. When this happens, we set this.isHovering to
            // false to prevent the hover state from confusing them as they move the mouse out of the control. This
            // extra mouseenter will reinstate it if they happen to mouse over an adjacent symbol.
            return html`
              <span
                class=${classMap({
                rating__symbol: true,
                'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
            })}
                role="presentation"
                @mouseenter=${this.handleMouseEnter}
              >
                ${unsafeHTML(this.getSymbol(index + 1))}
              </span>
            `;
        })}
        </span>

        <span class="rating__symbols rating__symbols--indicator">
          ${counter.map(index => {
            return html`
              <span
                class=${classMap({
                rating__symbol: true,
                'rating__symbol--hover': this.isHovering && Math.ceil(displayValue) === index + 1
            })}
                style=${styleMap({
                clipPath:
                    displayValue > index + 1 ? 'none' : `inset(0 ${100 - ((displayValue - index) / 1) * 100}% 0 0)`
            })}
                role="presentation"
              >
                ${unsafeHTML(this.getSymbol(index + 1))}
              </span>
            `;
        })}
        </span>
      </div>
    `;

    }
}
customElements.define('al-rating', AlRating);