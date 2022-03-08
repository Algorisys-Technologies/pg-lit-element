import { css } from 'lit';

export default css`
:host {
    display: inline-block;
  }
  .dropdown {
    position: relative;
  }
  .dropdown__trigger {
    display: block;
  }
  .dropdown__positioner {
    position: absolute;
    z-index: 900;
    background: lightgray;
  }
  .dropdown__panel {
    max-height: 75vh;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
    font-weight: 400;
    color: rgb(63 63 70);
    background-color: hsl(0, 0%, 100%)
    border: solid 1px hsl(240 5.9% 90%);
    border-radius: 0.25rem;
    box-shadow: 0 2px 8px hsl(240 3.8% 46.1% / 12%);
    overflow: auto;
    overscroll-behavior: none;
    pointer-events: none;
  }
  .dropdown--open .dropdown__panel {
    pointer-events: all;
  }
  
`;