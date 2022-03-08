import { LitElement, html } from "../../../node_modules/lit-element/lit-element.js";
import styles from './al-color-picker.styles.js';
import { classMap } from "../../../node_modules/lit/directives/class-map.js";
import { ifDefined } from "../../../node_modules/lit/directives/if-defined.js";
import { live } from "../../../node_modules/lit/directives/live.js";
import { unsafeHTML } from '../../../node_modules/lit/directives/unsafe-html.js';
import { styleMap } from "../../../node_modules/lit/directives/style-map.js";
import { emit, clamp } from "../common-function.js";

// import Color from '../../../node_modules/color/index.js';
// import Color from "../../../node_modules/color/index.js";
// import Color from '../../../node_modules/@types/color/index.js';
// const Color = require('color');
// import color from 'color';

const hasEyeDropper = 'EyeDropper' in window;

export default class AlColorPicker extends LitElement {

  get input() {
    return this.renderRoot.querySelector('[part="input"]');
  }

  get previewButton() {
    return this.renderRoot.querySelector('[part="preview"]');
  }

  get dropdown() {
    return this.renderRoot.querySelector('.color-dropdown');
  }

  static get styles() {
    return styles;
  }

  static get properties() {
    return {
      /** The current color. */
      value: { type: String, reflect: true },

      /**
       * The format to use for the display value. If opacity is enabled, these will translate to HEXA, RGBA, and HSLA
       * respectively. The color picker will always accept user input in any format (including CSS color names) and convert
       * it to the desired format.
       */
      format: { type: String, reflect: true },

      /** Renders the color picker inline rather than inside a dropdown. */
      inline: { type: Boolean, reflect: true },

      /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
      size: { type: String, reflect: true },

      /** Removes the format toggle. */
      noFormatToggle: { attribute: 'no-format-toggle', type: Boolean },

      /** The input's name attribute. */
      name: { type: String, reflect: true },

      /** Disables the color picker. */
      disabled: { type: Boolean, reflect: true },

      /**
       * This will be true when the control is in an invalid state. Validity is determined by the `setCustomValidity()`
       * method using the browser's constraint validation API.
       */
      invalid: { type: Boolean, reflect: true },

      /**
       * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
       * `overflow: auto|scroll`.
       */
      hoist: { type: Boolean },

      /** Whether to show the opacity slider. */
      opacity: { type: Boolean },

      /** By default, the value will be set in lowercase. Set this to true to set it in uppercase instead. */
      uppercase: { type: Boolean },

      /**
       * An array of predefined color swatches to display. Can include any format the color picker can parse, including
       * HEX(A), RGB(A), HSL(A), and CSS color names.
       */
      swatches: { attribute: false },

      inputValue: { state: true },
      hue: { state: true },
      saturation: { state: true },
      lightness: { state: true },
      alpha: { state: true },
    }
  }

  constructor() {
    super();
    this.isSafeValue = false;
    this.lastValueEmitted;
    this.value = '#ffffff';
    this.format = 'hex';
    this.inline = false;
    this.size = 'medium';
    this.noFormatToggle = false;
    this.name = '';
    this.disabled = false;
    this.invalid = false;
    this.hoist = false;
    this.opacity = false;
    this.uppercase = false;
    this.swatches = [
      '#d0021b',
      '#f5a623',
      '#f8e71c',
      '#8b572a',
      '#7ed321',
      '#417505',
      '#bd10e0',
      '#9013fe',
      '#4a90e2',
      '#50e3c2',
      '#b8e986',
      '#000',
      '#444',
      '#888',
      '#ccc',
      '#fff'
    ];
    this.inputValue = '';
    this.hue = 0;
    this.saturation = 100;
    this.lightness = 100;
    this.alpha = 100;
  }

  firstUpdated() {
    if (!this.setColor(this.value)) {
      this.setColor(`#ffff`);
    }

    this.inputValue = this.value;
    this.lastValueEmitted = this.value;
    this.syncValues();
  }

  normalizeColorString(colorString) {
    //
    // The color module we're using doesn't parse % values for the alpha channel in RGBA and HSLA. It also doesn't parse
    // hex colors when the # is missing. This pre-parser tries to normalize these edge cases to provide a better
    // experience for users who type in color values.
    //
    if (/rgba?/i.test(colorString)) {
      const rgba = colorString
        .replace(/[^\d.%]/g, ' ')
        .split(' ')
        .map(val => val.trim())
        .filter(val => val.length);

      if (rgba.length < 4) {
        rgba[3] = '1';
      }

      if (rgba[3].indexOf('%') > -1) {
        rgba[3] = (Number(rgba[3].replace(/%/g, '')) / 100).toString();
      }

      return `rgba(${rgba[0]}, ${rgba[1]}, ${rgba[2]}, ${rgba[3]})`;
    }

    if (/hsla?/i.test(colorString)) {
      const hsla = colorString
        .replace(/[^\d.%]/g, ' ')
        .split(' ')
        .map(val => val.trim())
        .filter(val => val.length);

      if (hsla.length < 4) {
        hsla[3] = '1';
      }

      if (hsla[3].indexOf('%') > -1) {
        hsla[3] = (Number(hsla[3].replace(/%/g, '')) / 100).toString();
      }

      return `hsla(${hsla[0]}, ${hsla[1]}, ${hsla[2]}, ${hsla[3]})`;
    }

    if (/^[0-9a-f]+$/i.test(colorString)) {
      return `#${colorString}`;
    }

    return colorString;
  }

  parseColor(colorString) {
    function toHex(value) {
      const hex = Math.round(value).toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    }

    let parsed;

    // The color module has a weak parser, so we normalize certain things to make the user experience better
    colorString = this.normalizeColorString(colorString);

    try {
      parsed = Color(colorString);
    } catch {
      return false;
    }

    const hsl = {
      h: parsed.hsl().color[0],
      s: parsed.hsl().color[1],
      l: parsed.hsl().color[2],
      a: parsed.hsl().valpha
    };

    const rgb = {
      r: parsed.rgb().color[0],
      g: parsed.rgb().color[1],
      b: parsed.rgb().color[2],
      a: parsed.rgb().valpha
    };

    const hex = {
      r: toHex(parsed.rgb().color[0]),
      g: toHex(parsed.rgb().color[1]),
      b: toHex(parsed.rgb().color[2]),
      a: toHex(parsed.rgb().valpha * 255)
    };

    return {
      hsl: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        string: this.setLetterCase(`hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`)
      },
      hsla: {
        h: hsl.h,
        s: hsl.s,
        l: hsl.l,
        a: hsl.a,
        string: this.setLetterCase(
          `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${Number(
            hsl.a.toFixed(2).toString()
          )})`
        )
      },
      rgb: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        string: this.setLetterCase(`rgb(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)})`)
      },
      rgba: {
        r: rgb.r,
        g: rgb.g,
        b: rgb.b,
        a: rgb.a,
        string: this.setLetterCase(
          `rgba(${Math.round(rgb.r)}, ${Math.round(rgb.g)}, ${Math.round(rgb.b)}, ${Number(
            rgb.a.toFixed(2).toString()
          )})`
        )
      },
      hex: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}`),
      hexa: this.setLetterCase(`#${hex.r}${hex.g}${hex.b}${hex.a}`)
    };
  }

  async syncValues() {
    const currentColor = this.parseColor(
      `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    );

    if (!currentColor) {
      return;
    }

    // Update the value
    if (this.format === 'hsl') {
      this.inputValue = this.opacity ? currentColor.hsla.string : currentColor.hsl.string;
    } else if (this.format === 'rgb') {
      this.inputValue = this.opacity ? currentColor.rgba.string : currentColor.rgb.string;
    } else {
      this.inputValue = this.opacity ? currentColor.hexa : currentColor.hex;
    }

    // Setting this.value will trigger the watcher which parses the new value. We want to bypass that behavior because
    // we've already parsed the color here and conversion/rounding can lead to values changing slightly. When this
    // happens, dragging the grid handle becomes jumpy. After the next update, the usual behavior is restored.
    this.isSafeValue = true;
    this.value = this.inputValue;
    await this.updateComplete;
    this.isSafeValue = false;
  }

  handleEyeDropper() {
    if (!hasEyeDropper) {
      return;
    }

    const eyeDropper = new EyeDropper();

    eyeDropper
      .open()
      .then((colorSelectionResult) => this.setColor(colorSelectionResult.sRGBHex))
      .catch(() => {
        // The user canceled, do nothing
      });
  }

  handleInputChange(event) {
    const target = event.target;

    this.setColor(target.value);
    target.value = this.value;
    event.stopPropagation();
  }

  handleInputKeyDown(event) {
    if (event.key === 'Enter') {
      this.setColor(this.input.value);
      this.input.value = this.value;
      setTimeout(() => this.input.select());
    }
  }

  setColor(colorString) {
    const newColor = this.parseColor(colorString);

    if (!newColor) {
      return false;
    }

    this.hue = newColor.hsla.h;
    this.saturation = newColor.hsla.s;
    this.lightness = newColor.hsla.l;
    this.alpha = this.opacity ? newColor.hsla.a * 100 : 100;

    this.syncValues();

    return true;
  }

  handleFormatChange() {
    this.syncValues();
  }

  handleOpacityChange() {
    this.alpha = 100;
  }

  handleValueChange(oldValue, newValue) {
    if (!this.isSafeValue) {
      const newColor = this.parseColor(newValue);

      if (newColor) {
        this.inputValue = this.value;
        this.hue = newColor.hsla.h;
        this.saturation = newColor.hsla.s;
        this.lightness = newColor.hsla.l;
        this.alpha = newColor.hsla.a * 100;
      } else {
        this.inputValue = oldValue;
      }
    }

    if (this.value !== this.lastValueEmitted) {
      emit(this, 'al-change');
      this.lastValueEmitted = this.value;
    }
  }

  handleCopy() {
    this.input.select();
    document.execCommand('copy');
    this.previewButton.focus();

    // Show copied animation
    this.previewButton.classList.add('color-picker__preview-color--copied');
    this.previewButton.addEventListener('animationend', () =>
      this.previewButton.classList.remove('color-picker__preview-color--copied')
    );
  }

  handleGridDrag(event) {
    const grid = this.shadowRoot.querySelector('.color-picker__grid');
    const handle = grid.querySelector('.color-picker__grid-handle');
    const { width, height } = grid.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.handleDrag(event, grid, (x, y) => {
      this.saturation = clamp((x / width) * 100, 0, 100);
      this.lightness = clamp(100 - (y / height) * 100, 0, 100);
      this.syncValues();
    });
  }

  handleFormatToggle() {
    const formats = ['hex', 'rgb', 'hsl'];
    const nextIndex = (formats.indexOf(this.format) + 1) % formats.length;
    this.format = formats[nextIndex];
    this.handleFormatChange();
  }

  setLetterCase(string) {
    if (typeof string !== 'string') return '';
    return this.uppercase ? string.toUpperCase() : string.toLowerCase();
  }

  handleAfterHide() {
    this.previewButton.classList.remove('color-picker__preview-color--copied');
  }

  handleDrag(event, container, onMove) {
    if (this.disabled) {
      return;
    }

    const move = (event) => {
      const dims = container.getBoundingClientRect();
      const defaultView = container.ownerDocument.defaultView;
      const offsetX = dims.left + defaultView.pageXOffset;
      const offsetY = dims.top + defaultView.pageYOffset;
      const x = (event.changedTouches ? event.changedTouches[0].pageX : event.pageX) - offsetX;
      const y = (event.changedTouches ? event.changedTouches[0].pageY : event.pageY) - offsetY;

      onMove(x, y);
    };

    // Move on init
    move(event);

    const stop = () => {
      document.removeEventListener('mousemove', move);
      document.removeEventListener('touchmove', move);
      document.removeEventListener('mouseup', stop);
      document.removeEventListener('touchend', stop);
    };

    document.addEventListener('mousemove', move);
    document.addEventListener('touchmove', move);
    document.addEventListener('mouseup', stop);
    document.addEventListener('touchend', stop);
  }

  handleHueDrag(event) {
    const container = this.shadowRoot.querySelector('.color-picker__slider.color-picker__hue');
    const handle = container.querySelector('.color-picker__slider-handle');
    const { width } = container.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.hue = clamp((x / width) * 360, 0, 360);
      this.syncValues();
    });
  }

  handleAlphaKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.alpha = clamp(this.alpha - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.alpha = clamp(this.alpha + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.alpha = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.alpha = 100;
      this.syncValues();
    }
  }

  handleHueKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.hue = clamp(this.hue - increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.hue = clamp(this.hue + increment, 0, 360);
      this.syncValues();
    }

    if (event.key === 'Home') {
      event.preventDefault();
      this.hue = 0;
      this.syncValues();
    }

    if (event.key === 'End') {
      event.preventDefault();
      this.hue = 360;
      this.syncValues();
    }
  }

  handleGridKeyDown(event) {
    const increment = event.shiftKey ? 10 : 1;

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      this.saturation = clamp(this.saturation - increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      this.saturation = clamp(this.saturation + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.lightness = clamp(this.lightness + increment, 0, 100);
      this.syncValues();
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.lightness = clamp(this.lightness - increment, 0, 100);
      this.syncValues();
    }
  }

  handleAlphaDrag(event) {
    const container = this.shadowRoot.querySelector('.color-picker__slider.color-picker__alpha');
    const handle = container.querySelector('.color-picker__slider-handle');
    const { width } = container.getBoundingClientRect();

    handle.focus();
    event.preventDefault();

    this.handleDrag(event, container, x => {
      this.alpha = clamp((x / width) * 100, 0, 100);
      this.syncValues();
    });
  }

  render() {
    const x = this.saturation;
    const y = 100 - this.lightness;

    const colorPicker = html`
    <div
      part="base"
      class=${classMap({
      'color-picker': true,
      'color-picker--inline': this.inline,
      'color-picker--disabled': this.disabled
    })}
      aria-disabled=${this.disabled ? 'true' : 'false'}
    >
      <div
        part="grid"
        class="color-picker__grid"
        style=${styleMap({ backgroundColor: `hsl(${this.hue}deg, 100%, 50%)` })}
        @mousedown=${this.handleGridDrag}
        @touchstart=${this.handleGridDrag}
      >
        <span
          part="grid-handle"
          class="color-picker__grid-handle"
          style=${styleMap({
      top: `${y}%`,
      left: `${x}%`,
      backgroundColor: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%)`
    })}
          role="slider"
          aria-label="HSL"
          aria-valuetext=${`hsl(${Math.round(this.hue)}, ${Math.round(this.saturation)}%, ${Math.round(
      this.lightness
    )}%)`}
          tabindex=${ifDefined(this.disabled ? undefined : '0')}
          @keydown=${this.handleGridKeyDown}
        ></span>
      </div>

      <div class="color-picker__controls">
        <div class="color-picker__sliders">
          <div
            part="slider hue-slider"
            class="color-picker__hue color-picker__slider"
            @mousedown=${this.handleHueDrag}
            @touchstart=${this.handleHueDrag}
          >
            <span
              part="slider-handle"
              class="color-picker__slider-handle"
              style=${styleMap({
      left: `${this.hue === 0 ? 0 : 100 / (360 / this.hue)}%`
    })}
              role="slider"
              aria-label="hue"
              aria-orientation="horizontal"
              aria-valuemin="0"
              aria-valuemax="360"
              aria-valuenow=${Math.round(this.hue)}
              tabindex=${ifDefined(this.disabled ? undefined : '0')}
              @keydown=${this.handleHueKeyDown}
            ></span>
          </div>

          ${this.opacity
        ? html`
                <div
                  part="slider opacity-slider"
                  class="color-picker__alpha color-picker__slider color-picker__transparent-bg"
                  @mousedown="${this.handleAlphaDrag}"
                  @touchstart="${this.handleAlphaDrag}"
                >
                  <div
                    class="color-picker__alpha-gradient"
                    style=${styleMap({
          backgroundImage: `linear-gradient(
                        to right,
                        hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, 0%) 0%,
                        hsl(${this.hue}deg, ${this.saturation}%, ${this.lightness}%) 100%
                      )`
        })}
                  ></div>
                  <span
                    part="slider-handle"
                    class="color-picker__slider-handle"
                    style=${styleMap({
          left: `${this.alpha}%`
        })}
                    role="slider"
                    aria-label="alpha"
                    aria-orientation="horizontal"
                    aria-valuemin="0"
                    aria-valuemax="100"
                    aria-valuenow=${Math.round(this.alpha)}
                    tabindex=${ifDefined(this.disabled ? undefined : '0')}
                    @keydown=${this.handleAlphaKeyDown}
                  ></span>
                </div>
              `
        : ''}
        </div>

        <button
          type="button"
          part="preview"
          class="color-picker__preview color-picker__transparent-bg"
          style=${styleMap({
          '--preview-color': `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
        })}
          @click=${this.handleCopy}
        ></button>
      </div>

      <div class="color-picker__user-input">
        <al-input
          part="input"
          type="text"
          name=${this.name}
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
          .value=${live(this.inputValue)}
          ?disabled=${this.disabled}
          @keydown=${this.handleInputKeyDown}
          @al-change=${this.handleInputChange}
        ></al-input>

        
          ${!this.noFormatToggle
        ? html`
                <al-button
                  exportparts="base:format-button"
                  @click=${this.handleFormatToggle}
                >
                  ${this.setLetterCase(this.format)}
                </al-button>
              `
        : ''}
          ${hasEyeDropper
        ? html`
                <al-button exportparts="base:eye-dropper-button" @click=${this.handleEyeDropper}>
                  <al-icon
                    name="eyedropper"
                  ></al-icon>
                </al-button>
              `
        : ''}
       
      </div>

      ${this.swatches
        ? html`
            <div part="swatches" class="color-picker__swatches">
              ${this.swatches.map(swatch => {
          return html`
                  <div
                    part="swatch"
                    class="color-picker__swatch color-picker__transparent-bg"
                    tabindex=${ifDefined(this.disabled ? undefined : '0')}
                    role="button"
                    aria-label=${swatch}
                    @click=${() => !this.disabled && this.setColor(swatch)}
                    @keydown=${(event) =>
              !this.disabled && event.key === 'Enter' && this.setColor(swatch)}
                  >
                    <div class="color-picker__swatch-color" style=${styleMap({ backgroundColor: swatch })}></div>
                  </div>
                `;
        })}
            </div>
          `
        : ''}
    </div>
  `;

    // Render inline
    if (this.inline) {
      return colorPicker;
    }

    // Render as a dropdown
    return html`
    <al-dropdown
      class="color-dropdown"
      aria-disabled=${this.disabled ? 'true' : 'false'}
      .containing-element=${this}
      ?disabled=${this.disabled}
      ?hoist=${this.hoist}
      @al-after-hide=${this.handleAfterHide}
    >
      <button
        part="trigger"
        slot="trigger"
        class=${classMap({
      'color-dropdown__trigger': true,
      'color-dropdown__trigger--disabled': this.disabled,
      'color-dropdown__trigger--small': this.size === 'small',
      'color-dropdown__trigger--medium': this.size === 'medium',
      'color-dropdown__trigger--large': this.size === 'large',
      'color-picker__transparent-bg': true
    })}
        style=${styleMap({
      color: `hsla(${this.hue}deg, ${this.saturation}%, ${this.lightness}%, ${this.alpha / 100})`
    })}
        type="button"
      ></button>
      ${colorPicker}
    </al-dropdown>
  `;
  }
}

customElements.define('al-color-picker', AlColorPicker);