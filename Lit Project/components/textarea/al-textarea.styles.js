import { css } from "lit";

export default css`
  :host {
    display: block;
  }

  .textarea {
    display: flex;
    align-items: center;
    position: relative;
    width: 100%;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: normal;
    vertical-align: middle;
    cursor: text;
  }

  /* Standard textareas */
  .textarea--standard {
    background-color: hsl(0, 0%, 100%);
    border: solid 1px hsl(240 4.9% 83.9%);
  }

  .textarea--standard:hover:not(.textarea--disabled) {
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(240 5% 64.9%);
  }
  
  .textarea--standard:hover:not(.textarea--disabled) .textarea__control {
    color: hsl(240 5.3% 26.1%);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) {
    background-color: hsl(0, 0%, 100%);
    border-color: hsl(198.6 88.7% 48.4%);
    box-shadow:  0 0 0 3px hsl(198.6 88.7% 48.4% / 40%);
    color: hsl(240 5.3% 26.1%);
  }

  .textarea--standard.textarea--focused:not(.textarea--disabled) .textarea__control {
    color: hsl(240 5.3% 26.1%);
  }

  .textarea--standard.textarea--disabled {
    background-color: hsl(240 4.8% 95.9%);
    border-color: hsl(240 4.9% 83.9%);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea--standard.textarea--disabled .textarea__control {
    color: hsl(240 5.9% 10%);
  }

  .textarea--standard.textarea--disabled .textarea__control::placeholder {
    color: hsl(240 5.2% 33.9%);
  }

  /* Filled textareas */
  .textarea--filled {
    border: none;
    background-color: hsl(240 4.8% 95.9%);
    color: hsl(240 5.3% 26.1%);
  }

  .textarea--filled:hover:not(.textarea--disabled) {
    background-color: hsl(240 4.8% 95.9%);
  }

  .textarea--filled.textarea--focused:not(.textarea--disabled) {
    background-color: hsl(240 4.8% 95.9%);
    box-shadow: 0 0 0 3px hsl(198.6 88.7% 48.4% / 40%);
  }

  .textarea--filled.textarea--disabled {
    background-color: hsl(240 4.8% 95.9%);
    opacity: 0.5;
    cursor: not-allowed;
  }

  .textarea__control {
    flex: 1 1 auto;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    line-height: 1.4;
    color: hsl(240 5.3% 26.1%);
    border: none;
    background: none;
    box-shadow: none;
    cursor: inherit;
  }

  .textarea__control::placeholder {
    color: hsl(240 3.8% 46.1%);
    user-select: none;
  }

  .textarea__control:focus {
    outline: none;
  }

  /*
   * Size modifiers
   */

  .textarea--small {
    border-radius: 4px;
    font-size: 14px;
  }

  .textarea--small .textarea__control {
    padding: 8px 12px;
  }

  .textarea--medium {
    border-radius: 4px;
    font-size: 16px;
  }

  .textarea--medium .textarea__control {
    padding: 8px 16px;
  }

  .textarea--large {
    border-radius: 4px;
    font-size: 20px;
  }

  .textarea--large .textarea__control {
    padding: 8px 20px;
  }

  /*
   * Resize types
   */

  .textarea--resize-none .textarea__control {
    resize: none;
  }

  .textarea--resize-vertical .textarea__control {
    resize: vertical;
  }

  .textarea--resize-auto .textarea__control {
    height: auto;
    resize: none;
  }

  .textarea--helptext {
    opacity: 0.5;
    user-select: none;
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: normal;
    vertical-align: middle;
    cursor: text;
  }

  .textarea--label {
    font-family: Georgia, 'Times New Roman', serif;
    font-weight: 400;
    line-height: 1.8;
    letter-spacing: normal;
  }
`;