import { css } from "lit";

export default css`
:host {
    --grid-width: 280px;
    --grid-height: 200px;
    --grid-handle-size: 16px;
    --slider-height: 15px;
    --slider-handle-size: 17px;
    --swatch-size: 25px;
    display: inline-block;
  }
  .color-picker {
    width: var(--grid-width);
    font-family: Georgia, 'Times New Roman', serif;
    font-size: 1rem;
    font-weight: 400;
    color: var(--Color);
    background-color: hsl(0, 0%, 100%);
    border-radius: 0.25rem;
    user-select: none;
  }
  .color-picker--inline {
    border: solid 1px hsl(240 5.9% 90%);
  }
  .color-picker__grid {
    position: relative;
    height: var(--grid-height);
    background-image: linear-gradient(
        to bottom,
        hsl(0, 0%, 100%) 0%,
        hsla(0, 0%, 100%, 0) 50%,
        hsla(0, 0%, 0%, 0) 50%,
        hsl(0, 0%, 0%) 100%
      ),
      linear-gradient(to right, hsl(0, 0%, 50%) 0%, hsla(0, 0%, 50%, 0) 100%);
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    cursor: crosshair;
  }
  .color-picker__grid-handle {
    position: absolute;
    width: var(--grid-handle-size);
    height: var(--grid-handle-size);
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    border: solid 2px white;
    margin-top: calc(var(--grid-handle-size) / -2);
    margin-left: calc(var(--grid-handle-size) / -2);
  }
  .color-picker__controls {
    padding: 0.75rem;
    display: flex;
    align-items: center;
  }
  .color-picker__sliders {
    flex: 1 1 auto;
  }
  .color-picker__slider {
    position: relative;
    height: var(--slider-height);
    border-radius: 9999px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }
  .color-picker__slider:not(:last-of-type) {
    margin-bottom: 0.75rem;
  }
  .color-picker__slider-handle {
    position: absolute;
    top: calc(50% - var(--slider-handle-size) / 2);
    width: var(--slider-handle-size);
    height: var(--slider-handle-size);
    background-color: white;
    border-radius: 50%;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
    margin-left: calc(var(--slider-handle-size) / -2);
  }
  .color-picker__hue {
    background-image: linear-gradient(
      to right,
      rgb(255, 0, 0) 0%,
      rgb(255, 255, 0) 17%,
      rgb(0, 255, 0) 33%,
      rgb(0, 255, 255) 50%,
      rgb(0, 0, 255) 67%,
      rgb(255, 0, 255) 83%,
      rgb(255, 0, 0) 100%
    );
  }
  .color-picker__alpha .color-picker__alpha-gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
  }
  .color-picker__preview {
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 3.25rem;
    height: 2.25rem;
    border: none;
    border-radius: 0.25rem;
    background: none;
    margin-left: 0.75rem;
    cursor: copy;
  }
  .color-picker__preview:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    background-color: var(--preview-color);
  }
  .color-picker__preview-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
  }
  .color-picker__preview-color--copied {
    animation: pulse 0.75s;
  }
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 hsl(198.6 88.7% 48.4%);
    }
    70% {
      box-shadow: 0 0 0 0.5rem transparent;
    }
    100% {
      box-shadow: 0 0 0 0 transparent;
    }
  }
  .color-picker__user-input {
    display: flex;
    padding: 0 0.75rem 0.75rem 0.75rem;
  }
  .color-picker__user-input al-input {
    min-width: 0; /* fix input width in Safari */
    flex: 1 1 auto;
  }
  
  .color-picker__user-input al-button {
    min-width: 3.25rem;
    max-width: 3.25rem;
    font-size: 1rem;
  }
  .color-picker__swatches {
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-gap: 0.5rem;
    justify-items: center;
    border-top: solid 1px hsl(240 5.9% 90%);
    padding: 0.75rem;
  }
  .color-picker__swatch {
    position: relative;
    width: var(--swatch-size);
    height: var(--swatch-size);
    border-radius: 0.1875rem;
  }
  .color-picker__swatch .color-picker__swatch-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: solid 1px rgba(0, 0, 0, 0.125);
    border-radius: inherit;
    cursor: pointer;
  }
  .color-picker__transparent-bg {
    background-image: linear-gradient(45deg, hsl(240 4.9% 83.9%) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, hsl(240 4.9% 83.9%) 75%),
      linear-gradient(45deg, transparent 75%, hsl(240 4.9% 83.9%) 75%),
      linear-gradient(45deg, hsl(240 4.9% 83.9%) 25%, transparent 25%);
    background-size: 10px 10px;
    background-position: 0 0, 0 0, -5px -5px, 5px 5px;
  }
  .color-picker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  .color-picker--disabled .color-picker__grid,
  .color-picker--disabled .color-picker__grid-handle,
  .color-picker--disabled .color-picker__slider,
  .color-picker--disabled .color-picker__slider-handle,
  .color-picker--disabled .color-picker__preview,
  .color-picker--disabled .color-picker__swatch,
  .color-picker--disabled .color-picker__swatch-color {
    pointer-events: none;
  }
  /*
   * Color dropdown
   */
  .color-dropdown::part(panel) {
    max-height: none;
    overflow: visible;
  }
  .color-dropdown__trigger {
    display: inline-block;
    position: relative;
    background-color: transparent;
    border: none;
    cursor: pointer;
    transition: 150ms box-shadow;
  }
  .color-dropdown__trigger.color-dropdown__trigger--small {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
  }
  .color-dropdown__trigger.color-dropdown__trigger--medium {
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
  }
  .color-dropdown__trigger.color-dropdown__trigger--large {
    width: 3.125rem;
    height: 3.125rem;
    border-radius: 50%;
  }
  .color-dropdown__trigger:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    background-color: currentColor;
    box-shadow: inset 0 0 0 2px hsl(240 4.9% 83.9%), inset 0 0 0 4px hsl(0, 0%, 100%);
    transition: inherit;
  }
  .color-dropdown__trigger.color-dropdown__trigger--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;