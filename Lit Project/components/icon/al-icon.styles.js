import { css } from 'lit';

export default css`
    :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    contain: strict;
    font-size:16px;
    box-sizing: content-box !important;
  }
  .icon,
  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`;