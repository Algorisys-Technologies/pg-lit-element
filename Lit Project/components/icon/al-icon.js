import { LitElement, html } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import styles from './al-icon.styles.js';
import { icons } from './al-icons.js';

export default class AlIcon extends LitElement {
    static get styles() {
        return styles;
    }

    static get properties() {
        return {
            name: { type: String },
            label: { type: String },
        }
    }

    constructor() {
        super();
    }

    getLabel() {
        let label = '';
        return this.label ? label = this.label : label = this.name.replace(/-/g, ' ');
    }

    svgRender() {
        for (let icon in icons) {
            if (icon == this.name) {
                return icons[icon];
            }
        }
    }

    render() {
        return html`
            <div part="base" class="icon" role="img" aria-label=${this.getLabel()}>
            <svg>${unsafeSVG(this.svgRender())} </svg> 
            </div>
        `;
    }

}
customElements.define("al-icon", AlIcon)