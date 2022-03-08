import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-progress-bar.styles.js';
import { classMap } from "../../../node_modules/lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map";

export default class AlProgressBar extends LitElement {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            /** The current progress, 0 to 100. */
            value: { type: Number, reflect: true },

            /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
            indeterminate: { type: Boolean, reflect: true },
        }
    }

    constructor() {
        super();
        this.value = 0;
        this.indeterminate = false;
    }

    render() {
        return html`
        <div
        part="base"
        class=${classMap({
            'progress-bar': true,
            'progress-bar--indeterminate': this.indeterminate
        })}
        role="progressbar"
      >
        <div part="indicator" class="progress-bar__indicator" style=${styleMap({ width: `${this.value}%` })}>
          ${!this.indeterminate
                ? html`
                <span part="label" class="progress-bar__label">
                    <slot></slot>
                </span>
              `
                : ''}
        </div>
      </div>
        `
    }
}
customElements.define('al-progress-bar', AlProgressBar);