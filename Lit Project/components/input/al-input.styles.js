import { css } from 'lit';

export default css`
  :host {
    display: block;
  }

  label {
    color: #141414;
    display: block;
    font-size: 14px;
  }

  .input {
    flex: 1 1 auto;
    display: inline-flex;
    align-items: stretch;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    letter-spacing: normal;
    vertical-align: middle;
    overflow: hidden;
    cursor: text;
  }

  /* Standard inputs */
  .input--standard {
    background-color: hsl(0, 0%, 100%);
    border: solid 1px hsl(240 4.9% 83.9%);
  }

  .input--standard:hover:not(.input--disabled) {
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(240 5% 64.9%);
  }

  .input--standard.input--focused:not(.input--disabled) {
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(198.6 88.7% 48.4%);
    box-shadow: 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%);
  }

  .input--standard.input--focused:not(.input--disabled) .input__control {
    color: hsl(240 5.3% 26.1%);
  }

  .input--standard.input--disabled {
    background-color: hsl(240 4.8% 95.9%);
    border-color: hsl(240 4.9% 83.9%);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input--standard.input--disabled .input__control {
    color: hsl(240 5.9% 10%);
  }

  .input--standard.input--disabled .input__control::placeholder {
    color: hsl(240 5.2% 33.9%);
  }

  /* Filled inputs */
  .input--filled {
    border: none;
    background-color: hsl(240 4.8% 95.9%);
    color: hsl(240 5.3% 26.1%);
  }

  .input--filled:hover:not(.input--disabled) {
    background-color: hsl(240 4.8% 95.9%);
  }

  .input--filled.input--focused:not(.input--disabled) {
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%);
  }

  .input--filled.input--disabled {
    background-color: hsl(240 4.8% 95.9%);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .input__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    min-width: 0;
    height: 100%;
    color: var(--sl-input-color);
    border: none;
    background: none;
    box-shadow: none;
    padding: 0;
    margin: 0;
    cursor: inherit;
  }

  .input__control::placeholder {
    color: hsl(240 3.8% 46.1%);
    user-select: none;
  }

  .input:hover:not(.input--disabled) .input__control {
    color: hsl(240 5.3% 26.1%);
  }

  .input__control:focus {
    outline: none;
  }

  .input__prefix,
  .input__suffix {
    display: inline-flex;
    flex: 0 0 auto;
    align-items: center;
    cursor: default;
  }

  .input__prefix ::slotted(al-icon),
  .input__suffix ::slotted(al-icon) {
    color: hsl(240 3.8% 46.1%);
  }

  /*
   * Size modifiers
   */

  .input--small {
    border-radius: 4px;
    font-size: 14px;
    height: 30px;
  }

  .input--small .input__control {
    height: calc(30px - 1px * 2);
    margin: 0 12px;
  }

  .input--small .input__clear,
  .input--small .input__password-toggle {
    margin-right: 12px;
  }

  .input--small .input__prefix ::slotted(*) {
    margin-left: 12px;
  }

  .input--small .input__suffix ::slotted(*) {
    margin-right: 12px;
  }

  .input--medium {
    border-radius: 4px;
    font-size: 16px;
    height: 40px;
  }

  .input--medium .input__control {
    height: calc(40px - 1px * 2);
    margin: 0 16px;
  }

  .input--medium .input__clear,
  .input--medium .input__password-toggle {
    margin-right: 16px;
  }

  .input--medium .input__prefix ::slotted(*) {
    margin-left: 16px;
  }

  .input--medium .input__suffix ::slotted(*) {
    margin-right: 16px;
  }

  .input--large {
    border-radius: 4px;
    font-size: 20px;
    height: 50px;
  }

  .input--large .input__control {
    height: calc(50px - 1px * 2);
    margin: 0 20px;
  }

  .input--large .input__clear,
  .input--large .input__password-toggle {
    margin-right: 20px;
  }

  .input--large .input__prefix ::slotted(*) {
    margin-left: 20px;
  }

  .input--large .input__suffix ::slotted(*) {
    margin-right: 20px;
  }

  /*
   * Pill modifier
   */

  .input--pill.input--small {
    border-radius: 30px;
  }

  .input--pill.input--medium {
    border-radius: 40px;
  }

  .input--pill.input--large {
    border-radius: 50px;
  }

  /*
   * Clearable + Password Toggle
   */

  .input__clear,
  .input__password-toggle {
    display: inline-flex;
    align-items: center;
    font-size: inherit;
    color: hsl(240 3.8% 46.1%);
    border: none;
    background: none;
    padding: 0;
    transition: 150ms color;
    cursor: pointer;
  }

  .input__clear:hover,
  .input__password-toggle:hover {
    color: hsl(240 5.2% 33.9%);
  }

  .input__clear:focus,
  .input__password-toggle:focus {
    outline: none;
  }

  .input--empty .input__clear {
    visibility: hidden;
  }

  .input--hint {
    opacity: 0.5;
  }
`;