import { css } from "lit";

export default css`
:host {
    --track-width: 2px;
    --track-color: hsl(0 0% 50% / 25%);
    --indicator-color: hsl(200.4 98% 39.4%);
    --speed: 800ms;
    display: inline-flex;
    width: 1em;
    height: 1em;
}

.spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
}

.spinner__track,
.spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
}

.spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
    mix-blend-mode: multiply;
}

.spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
}

@keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
}
`;