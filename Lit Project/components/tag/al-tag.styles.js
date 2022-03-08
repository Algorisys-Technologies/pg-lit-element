import { css } from "@lit/reactive-element";

export default css`
:host {
    display: inline-block;
  }

  .tag {
    display: flex;
    align-items: center;
    border: solid 1px;
    line-height: 1;
    white-space: nowrap;
    user-select: none;
    cursor: default;
  }

  .tag__remove::part(base) {
    color: inherit;
    padding: 0;
    cursor:pointer
  }

  /*
   * Type modifiers
   */

  .tag--primary {
    background-color: hsl(204 100% 97.1%);
    border-color: hsl(200.6 94.4% 86.1%);
    color: hsl(201 90% 27.5%);
  }

  .tag--success {
    background-color: hsl(138.5 76.5% 96.7%);
    border-color: hsl(141 78.9% 85.1%);
    color: hsl(142.8 64.2% 24.1%);
  }

  .tag--neutral {
    background-color: hsl(0 0% 97.5%);
    border-color: hsl(240 5.9% 90%);
    color: hsl(240 3.7% 15.9%);
  }

  .tag--warning {
    background-color: hsl(48 100% 96.1%);
    border-color: hsl(48 96.6% 76.7%);
    color: hsl(22.7 82.5% 31.4%);
  }

  .tag--danger {
    background-color: hsl(0 85.7% 97.3%);
    border-color: hsl(0 96.3% 89.4%);
    color: hsl(0 70% 35.3%);
  }

  /*
   * Size modifiers
   */

  .tag--small {
    font-size: 12px;
    height: calc(30px * 0.8);
    line-height: calc(30px - 1px * 2);
    border-radius: 4px;
    padding: 0 8px;
  }

  .tag--small .tag__remove {
    margin-left: 4px;
    margin-right: calc(-1 * 2px);
  }

  .tag--medium {
    font-size: 14px;
    height: calc(40px * 0.8);
    line-height: calc(40px - 1px * 2);
    border-radius: 4px;
    padding: 0 12px;
  }

  .tag__remove {
    margin-left: 4px;
    margin-right: calc(-1 * 4px);
  }

  .tag--large {
    font-size: 16px;
    height: calc(50px * 0.8);
    line-height: calc(50px - 1px * 2);
    border-radius: 4px;
    padding: 0 16px;
  }

  .tag__remove {
    margin-left: 4px;
    margin-right: calc(-1 * 8px);
  }

  /*
   * Pill modifier
   */

  .tag--pill {
    border-radius: 9999px;
  }
`;