import { css } from "lit";

export default css`
  :host {
    --padding: 0;
    
    display: block;
  }
    
  .tab-panel {
    border: solid 1px transparent;
    padding: var(--padding);
  }
`;