import { css } from "@lit/reactive-element";

export default css`
:host {
    --color: hsl(240 5.9% 90%);
    --width: 1px;
    --spacing: 16px;
  }
  :host(:not([vertical])) .menu-divider {
    display: block;
    border-top: solid var(--width) var(--color);
    margin: var(--spacing) 0;
  }
  :host([vertical]) {
    height: 100%;
  }
  :host([vertical]) .menu-divider {
    display: inline-block;
    height: 100%;
    border-left: solid var(--width) var(--color);
    margin: 0 var(--spacing);
  }
`;