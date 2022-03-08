import { css } from "lit";

export default css`
:host {
    --height: 16px;
    --track-color: hsl(240 5.9% 90%);
    --indicator-color: hsl(200.4 98% 39.4%);
    --label-color: hsl(0, 0%, 100%);
    display: block;
  }

  .progress-bar {
    position: relative;
    background-color: var(--track-color);
    height: var(--height);
    border-radius: 9999px;
    box-shadow: inset 0 1px 2px hsl(240 3.8% 46.1% / 12%);
    overflow: hidden;
  }

  .progress-bar__indicator {
    height: 100%;
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 12px;
    font-weight: 400;
    background-color: var(--indicator-color);
    color: var(--label-color);
    text-align: center;
    line-height: var(--height);
    white-space: nowrap;
    overflow: hidden;
    transition: 0.4s width, 0.4s background-color;
    user-select: none;
  }

  /* Indeterminate */

  .progress-bar--indeterminate .progress-bar__indicator {
    position: absolute;
    animation: indeterminate 2.5s infinite ease-out alternate;
  }

  @keyframes indeterminate {
    0% {left: -50%; width: 50%;}
    100% { left: 100%; width: 50%;}
}
`;