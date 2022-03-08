import { css } from 'lit'

export default css`
:host {
    display: block;
  }
  .select {
    display: block;
  }

  .select__control {
    display: inline-flex;
    align-items: center;
    justify-content: start;
    position: relative;
    width: 100%;
    font-family: SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace;
    font-weight: 400;
    letter-spacing: normal;
    vertical-align: middle;
    overflow: hidden;
    transition: 150ms color, 150ms border, 150ms box-shadow;
    cursor: pointer;
  }

  .select__menu {
    max-height: 50vh;
    overflow: auto;
  }

  /* Standard selects */
  .select--standard .select__control {
    background-color: hsl(0, 0%, 100%);
    border: solid 1px hsl(240 4.9% 83.9%);
    color: hsl(240 5.3% 26.1%);
  }
  .select--standard:not(.select--disabled) .select__control:hover {
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(240 5% 64.9%);
    color: hsl(240 5.3% 26.1%);
  }
  .select--standard.select--focused:not(.select--disabled) .select__control {
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(198.6 88.7% 48.4%);
    box-shadow: 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%);
    outline: none;
    color: hsl(240 5.3% 26.1%);
  }
  .select--standard.select--disabled .select__control {
    background-color:  hsl(240 4.8% 95.9%);
    border-color: hsl(240 4.9% 83.9%);
    color: hsl(240 5.9% 10%);
    opacity: 0.5;
    cursor: not-allowed;
    outline: none;
  }

  .select__prefix {
    display: inline-flex;
    align-items: center;
    color: hsl(240 3.8% 46.1%);
  }
  .select__label {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    user-select: none;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .select__clear {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    width: 1.25em;
    font-size: inherit;
    color: hsl(240 3.8% 46.1%);
    border: none;
    background: none;
    padding: 0;
    transition: 150ms color;
    cursor: pointer;
  }

  .select__clear:hover {
    color: hsl(240 5.2% 33.9%);
  }

  .select__suffix {
    display: inline-flex;
    align-items: center;
    color: hsl(240 3.8% 46.1%);
  }

  .select__icon {
    flex: 0 0 auto;
    display: inline-flex;
    transition: 250ms transform ease;
  }
  
  .select--open .select__icon {
    transform: rotate(-180deg);
  }

  /* Placeholder */
  .select--placeholder-visible .select__label {
    color: hsl(240 3.8% 46.1%);
  }

  .select--disabled.select--placeholder-visible .select__label {
    color: hsl(240 5.2% 33.9%);
  }

  /* Tags */
  .select__tags {
    display: inline-flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: 4px;
  }

  /* Hidden input (for form control validation to show) */
  .select__hidden-select {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    overflow: hidden;
    white-space: nowrap;
  }

  /* Filled selects */
  .select--filled .select__control {
    border: none;
    background-color: hsl(240 4.8% 95.9%);
    color: hsl(240 5.3% 26.1%);
  }
  .select--filled:hover:not(.select--disabled) .select__control {
    background-color: hsl(240 4.8% 95.9%);
  }
  .select--filled.select--focused:not(.select--disabled) .select__control {
    background-color: hsl(0, 0%, 100%);
    box-shadow: 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%);
  }
  .select--filled.select--disabled .select__control {
    background-color: hsl(240 4.8% 95.9%);
    opacity: 0.5;
    cursor: not-allowed;
  }
  .select--disabled .select__tags,
  .select--disabled .select__clear {
    pointer-events: none;
  }

  /*
   * Size modifiers
   */

  /* Small */

  .select--small .select__control {
    border-radius: 4px;
    font-size: 14px;
    min-height: 30px;
  }
  .select--small .select__prefix ::slotted(*) {
    margin-left: 12px;
  }
  .select--small .select__label {
    margin: 0 12px;
  }
  .select--small .select__clear {
    margin-right: 12px;
  }
  .select--small .select__suffix ::slotted(*) {
    margin-right: 12px;
  }
  .select--small .select__icon {
    margin-right: 12px;
  }
  .select--small .select__tags {
    padding-bottom: 2px;
  }
  .select--small .select__tags al-tag {
    padding-top: 2px;
    margin-right: 4px;
  }
  
  .select--small.select--has-tags .select__label {
    margin-left: 0;
  }

  /* Medium */

  .select--medium .select__control {
    border-radius: 4px;
    font-size: 16px;
    min-height: 40px;
  }
  .select--medium .select__prefix ::slotted(*) {
    margin-left: 16px;
  }
  .select--medium .select__label {
    margin: 0 16px;
  }
  .select--medium .select__clear {
    margin-right: 16px;
  }
  .select--medium .select__suffix ::slotted(*) {
    margin-right: 16px;
  }
  .select--medium .select__icon {
    margin-right: 16px;
  }
  .select--medium .select__tags {
    padding-bottom: 3px;
  }
  .select--medium .select__tags al-tag {
    padding-top: 3px;
    margin-right: 4px;
  }
  
  .select--medium.select--has-tags .select__label {
    margin-left: 0;
  }


  /* Large */

  .select--large .select__control {
    border-radius: 4px;
    font-size: 20px;
    min-height: 50px;
  }
  .select--large .select__prefix ::slotted(*) {
    margin-left: 20px;
  }
  .select--large .select__label {
    margin: 0 20px;
  }
  .select--large .select__clear {
    margin-right: 20px;
  }
  .select--large .select__suffix ::slotted(*) {
    margin-right: 20px;
  }
  .select--large .select__icon {
    margin-right: 20px;
  }
  .select--large .select__tags {
    padding-bottom: 4px;
  }
  .select--large .select__tags al-tag {
    padding-top: 4px;
    margin-right: 4px;
  }
  
  /*
   * Pill modifier
   */

  .select--pill.select--small .select__control {
    border-radius: 30px;
  }
  .select--pill.select--medium .select__control {
    border-radius: 40px;
  }
  .select--pill.select--large .select__control {
    border-radius: 50px;
  }

`;