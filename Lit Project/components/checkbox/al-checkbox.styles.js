import { css } from 'lit';

export default css`
  :host {
    display: inline-block;
  }
  .checkbox {
    display: inline-flex;
    align-items: center;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
    font-weight: 400;
    color: rgb(63 63 70);
    vertical-align: middle;
    cursor: pointer;
  }

  .checkbox--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
`;
