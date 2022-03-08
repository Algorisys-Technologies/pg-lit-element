import { css } from '../../../node_modules/@lit/reactive-element/css-tag'

export default css`
:host {
    display: inline-block;
    width: auto;
    cursor: pointer;
  }
  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: 2px;
    text-decoration: none;
    user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    cursor: inherit;    
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* default */

  .button--default {
    background-color: rgb(250 250 250);
    border-color: rgb(212 212 216);
    color: rgb(63 63 70);
  }
  .button--default:hover:not(.button--disabled) {
    background-color: rgb(240 249 255);
    border-color: rgb(125 211 252);
    color: rgb(3 105 161);
  }
  .button--default:active:not(.button--disabled) {
    background-color: rgb(224 242 254);
    border-color: rgb(56 189 248);
    color: rgb(3 105 161);
  }

  /* primary */
  .button--primary {
    background-color: rgb(2 132 199);
    border-color: rgb(2 132 199);
    color: rgb(255 255 255);
  }
  .button--primary:hover:not(.button--disabled) {
    background-color: rgb(14 165 233);
    border-color: rgb(14 165 233);
    color: rgb(255 255 255);
  }
  .button--primary:active:not(.button--disabled) {
    background-color: rgb(2 132 199);
    border-color: rgb(2 132 199);
    color: rgb(255 255 255);
  }

  /* success */
  .button--success {
    background-color: rgb(22 163 74);
    border-color: rgb(22 163 74);
    color: rgb(255 255 255));
  }
  .button--success:hover:not(.button--disabled) {
    background-color: rgb(34 197 94);
    border-color: rgb(34 197 94);
    color: rgb(255 255 255));
  }
  .button--success:active:not(.button--disabled) {
    background-color: rgb(22 163 74);
    border-color: rgb(22 163 74);
    color: rgb(255 255 255));
  }

  /* neutral */
  .button--neutral {
    background-color: rgb(82 82 91);
    border-color: rgb(82 82 91);
    color: rgb(255 255 255));
  }
  .button--neutral:hover:not(.button--disabled) {
    background-color: rgb(113 113 122);
    border-color: rgb(113 113 122);
    color: rgb(255 255 255));
  }
  .button--neutral:active:not(.button--disabled) {
    background-color: rgb(82 82 91);
    border-color: rgb(82 82 91);
    color: rgb(255 255 255));
  }

  /* warning */
  .button--warning {
    background-color: rgb(217 119 6);
    border-color: rgb(217 119 6);
    color: rgb(255 255 255));
  }
  .button--warning:hover:not(.button--disabled) {
    background-color: rgb(245 158 11);
    border-color: rgb(245 158 11);
    color: rgb(255 255 255));
  }
  .button--warning:active:not(.button--disabled) {
    background-color: rgb(217 119 6);
    border-color: rgb(217 119 6);
    color: rgb(255 255 255));
  }

  /* danger */
  .button--danger {
    background-color: rgb(220 38 38);
    border-color: rgb(220 38 38);
    color: rgb(255 255 255));
  }
  .button--danger:hover:not(.button--disabled) {
    background-color: rgb(239 68 68);
    border-color: rgb(239 68 68);
    color: rgb(255 255 255));
  }
  .button--danger:active:not(.button--disabled) {
    background-color: rgb(220 38 38);
    border-color: rgb(220 38 38);
    color: rgb(255 255 255));
  }

  /* text-button */
  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: rgb(2 132 199);
  }
  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(14 165 233);
  }
  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: rgb(3 105 161);
  }

  /* size */
  .button--small {
    font-size: 0.75rem;
    height: 1.875rem;
    line-height: calc(1.875rem - 1px * 2);
    border-radius: 0.25rem;
  }
  .button--medium {
    font-size: 0.875rem;
    height: 2.5rem;
    line-height: calc(2.5rem - 1px * 2);
    border-radius: 0.25rem;
  }
  .button--large {
    font-size: 1rem;
    height: 3.125rem;
    line-height: calc(3.125rem - 1px * 2);
    border-radius: 0.25rem;
  }

  /* button spacing */

  .button--has-label.button--small .button__label {
    padding: 0  0.75rem;
  }
  .button--has-label.button--medium .button__label {
    padding: 0 1rem;
  }
  .button--has-label.button--large .button__label {
    padding: 0 1.25rem;
  }

  .button__label ::slotted(al-icon) {
    vertical-align: -2px;
  }

  .button--caret .button__caret {
    display: flex;
    align-items: center;
  }
  .button--caret .button__caret svg {
    width: 1em;
    height: 1em;
  }
 `;