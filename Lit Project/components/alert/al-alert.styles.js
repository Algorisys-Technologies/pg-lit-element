import { css } from 'lit';

export default css`

  :host {
    display: contents;
  }

  .alert {
    position: relative;
    display: flex;
    align-items: stretch;
    background-color: hsl(0, 0%, 100%);
    border: solid 1px hsl(240 5.9% 90%);
    border-top-width: calc(1px * 3);
    border-radius: 4px;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 14px;
    line-height: 1.6;
    color: hsl(240 5.3% 26.1%);
    margin: inherit;
  }

  .alert__icon {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 20px;
  }

  .alert__icon ::slotted(*) {
    margin-left: 20px;
  }

  .alert--primary {
    border-top-color: hsl(200.4 98% 39.4%);
  }

  .alert--primary .alert__icon {
    fill: hsl(200.4 98% 39.4%);
  }

  .alert--success {
    border-top-color: hsl(142.1 76.2% 36.3%);
  }

  .alert--success .alert__icon {
    fill: hsl(142.1 76.2% 36.3%);
  }

  .alert--neutral {
    border-top-color: hsl(240 5.2% 33.9%);
  }

  .alert--neutral .alert__icon {
    fill: hsl(240 5.2% 33.9%);
  }

  .alert--warning {
    border-top-color: hsl(32.1 94.6% 43.7%);
  }

  .alert--warning .alert__icon {
    fill: hsl(32.1 94.6% 43.7%);
  }

  .alert--danger {
    border-top-color: hsl(0 72.2% 50.6%);
  }

  .alert--danger .alert__icon {
    fill: hsl(0 72.2% 50.6%);
  }

  .alert__message {
    flex: 1 1 auto;
    padding: 20px;
    overflow: hidden;
  }

  .alert__close {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: 2opx;
    padding-right: 16px;
  }

  [hidden]{
    display:none;
  }
`;