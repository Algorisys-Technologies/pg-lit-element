import { css } from "lit";

export default css`
:host {
    --symbol-color: hsl(240 4.9% 83.9%);
    --symbol-color-active:  hsl(37.7 92.1% 50.2%);
    --symbol-spacing: 2px;
    display: inline-flex;
}

.rating {
    position: relative;
    display: inline-flex;
    border-radius: 4px;
    vertical-align: middle;
}

.rating:focus {
    outline: none;
}

.rating__symbols {
    display: inline-flex;
    position: relative;
    line-height: 0;
    fill: var(--symbol-color);
    white-space: nowrap;
    cursor: pointer;
}

.rating__symbols > * {
    padding: var(--symbol-spacing);
}

.rating__symbols--indicator {
    position: absolute;
    top: 0;
    left: 0;
    fill: var(--symbol-color-active);
    pointer-events: none;
}

.rating__symbol {
    transition: 150ms transform;
}

.rating__symbol--hover {
    transform: scale(1.2);
}

  .rating--disabled .rating__symbols,
  .rating--readonly .rating__symbols {
    cursor: default;
  }
  
  .rating--disabled .rating__symbol--hover,
  .rating--readonly .rating__symbol--hover {
    transform: none;
  }

.rating--disabled {
    opacity: 0.5;
}

.rating--disabled .rating__symbols {
    cursor: not-allowed;
}

`;