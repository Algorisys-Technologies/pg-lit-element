import { css } from "lit";

export default css`
:host {
  --width: 496px;
  --header-spacing: 20px;
  --body-spacing: 20px;
  --footer-spacing: 20px;
  display: contents;
}

.dialog {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 800;
}

.dialog__panel {
  display: flex;
  flex-direction: column;
  z-index: 2;
  width: var(--width);
  max-width: calc(100% - 36px);
  max-height: calc(100% - 36px);
  background-color: hsl(0, 0%, 100%);
  border-radius: 4px;
  box-shadow: 0 4px 16px hsl(240 3.8% 46.1% / 12%);
}

.dialog__panel:focus {
  outline: none;
}

/* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
@media screen and (max-width: 420px) {
  .dialog__panel {
    max-height: 80vh;
  }
}

.dialog--open .dialog__panel {
  display: flex;
  opacity: 1;
  transform: none;
}

.dialog__header {
  flex: 0 0 auto;
  display: flex;
}

.dialog__title {
  flex: 1 1 auto;
  font-size: 20px;
  line-height: 1.4;
  padding: var(--header-spacing);
}

.dialog__close {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  font-size: 24px;
  padding: 0 var(--header-spacing);
  margin-top: 28px;
}

.dialog__body {
  flex: 1 1 auto;
  padding: var(--body-spacing);
  overflow: auto;
}

.dialog__footer {
  flex: 0 0 auto;
  text-align: right;
  padding: var(--footer-spacing);
}

.dialog__footer ::slotted(al-button:not(:first-of-type)) {
  margin-left: 8px;
}

.dialog:not(.dialog--has-footer) .dialog__footer {
  display: none;
}

.dialog__overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: hsl(240 3.8% 46.1% / 33%);
}

.al-scroll-lock {
  overflow: hidden !important;
 }

 [hidden]{
  display:none;
}
`;