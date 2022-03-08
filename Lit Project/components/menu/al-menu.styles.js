import { css } from 'lit';

export default css`
:host {
    display: block;
  }
  .menu {
    padding: 0.5rem 0;
  }
  ::slotted(al-divider) {
    --spacing: 0.5rem;
  }

`;
