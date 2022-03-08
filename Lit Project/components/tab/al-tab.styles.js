import { css } from "lit";

export default css`
  :host {
    display: inline-block;
  }

  .tab {
    display: inline-flex;
    align-items: center;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 14px;
    font-weight: 500;
    border-radius: 4px;
    color: hsl(240 5.2% 33.9%);
    padding: 16px 20px;
    white-space: nowrap;
    user-select: none;
    cursor: pointer;
  }

  .tab:hover:not(.tab--disabled) {
    color: hsl(200.4 98% 39.4%);
  }

  .tab:focus {
    outline: none;
  }

  .tab.tab--active:not(.tab--disabled) {
    color: hsl(200.4 98% 39.4%);
  }

  .tab.tab--closable {
    padding-right: 12px;
  }

  .tab.tab--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .tab__close-button {
    font-size: 20px;
    margin-left: 4px;
  }
  
`;
