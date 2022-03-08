import { css } from "lit";

export default css`
:host {
    display: inline-block;
  }

  .radio {
    display: inline-flex;
    align-items: center;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 16px;
    font-weight: 400;
    color: hsl(240 5.3% 26.1%);
    vertical-align: middle;
    cursor: pointer;
  }

  .radio__icon {
    display: inline-flex;
    width: 16px;
    height: 16px;
  }

  .radio__icon svg {
    width: 100%;
    height: 100%;
  }

  .radio__control {
    flex: 0 0 auto;
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    border: solid 1px hsl(240 4.9% 83.9%);
    border-radius: 50%;
    background-color: hsl(0, 0%, 100%);
    color: transparent;
  }

  .radio__input {
    position: absolute;
    opacity: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
  }
  
  /* Hover */
  .radio:not(.radio--checked):not(.radio--disabled) .radio__control:hover {
    border-color: hsl(240 5% 64.9%);
    background-color: hsl(0, 0%, 100%);
  }

  /* Checked */
  .radio--checked .radio__control {
    color: hsl(0, 0%, 100%);
    border-color: hsl(200.4 98% 39.4%);
    background-color: hsl(200.4 98% 39.4%);
  }

  /* Checked + hover */
  .radio.radio--checked:not(.radio--disabled) .radio__control:hover {
    border-color: hsl(198.6 88.7% 48.4%);
    background-color: hsl(198.6 88.7% 48.4%);
  }

  /* Disabled */
  .radio--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .radio__label {
    line-height: 16px;
    margin-left: 8px;
    user-select: none;
  }

`;