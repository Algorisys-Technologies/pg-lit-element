import { css } from 'lit';

export default css`
    :host {
    display: block;
  }

  .menu-item {
    position: relative;
    display: flex;
    align-items: stretch;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.8;
    text-align: left;
    color: rgb(63 63 70);
    padding: 0.25rem 1.75rem;
    user-select: none;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu-item.menu-item--disabled {
    outline: none;
    color: rgb(161 161 170);
    cursor: not-allowed;
  }

  .menu-item .menu-item__label {
    flex: 1 1 auto;
  }

  .menu-item .menu-item__prefix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__prefix ::slotted(*) {
    margin-right: 0.5rem;
  }

  :host(:focus) {
    outline: none;
  }

  .menu-item .menu-item__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
  }

  .menu-item .menu-item__suffix ::slotted(*) {
    margin-left: 0.5rem;
  }

  .menu-item .menu-item__check {
    display: flex;
    position: absolute;
    left: 0.5em;
    visibility: hidden;
    align-items: center;
  }

  :host(:hover) .menu-item {
    outline: none;
    background-color: hsl(200.4 98% 39.4%);
    color: hsl(0, 0%, 100%);
  }
  
  .menu-item--checked .menu-item__check {
    visibility: visible;
  }




`;