import { css } from "lit";

export default css`
:host {
    --track-color: hsl(240 5.9% 90%);
    --indicator-color: hsl(200.4 98% 39.4%);
    display: block;
}

.tab-group {
    display: flex;
    border: solid 1px transparent;
    border-radius: 0;
}

.tab-group .tab-group__tabs {
    display: flex;
    position: relative;
}

.tab-group .tab-group__indicator {
    position: absolute;
    left: 0;
    transition: 150ms transform ease, 150ms width ease;
}

.tab-group--has-scroll-controls .tab-group__nav-container {
    position: relative;
    padding: 0 28px;
}

.tab-group__scroll-button {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    width: 28px;
}

.tab-group__scroll-button--start {
    left: 0;
}

.tab-group__scroll-button--end {
    right: 0;
}

  /*
   * Top
   */

.tab-group--top {
    flex-direction: column;
}

.tab-group--top .tab-group__nav-container {
    order: 1;
}

.tab-group--top .tab-group__nav {
    display: flex;
    overflow-x: auto;
}

/* Hide scrollbar in Chrome/Safari */
.tab-group--top .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.tab-group--top .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-bottom: solid 2px var(--track-color);
}

.tab-group--top .tab-group__indicator {
    bottom: -2px;
    border-bottom: solid 2px var(--indicator-color);
}

.tab-group--top .tab-group__body {
    order: 2;
}

.tab-group--top ::slotted(al-tab-panel) {
    --padding: 16px 0;
}

  /*
   * Bottom
   */
.tab-group--bottom {
    flex-direction: column;
}

.tab-group--bottom .tab-group__nav-container {
    order: 2;
}

.tab-group--bottom .tab-group__nav {
    display: flex;
    overflow-x: auto;
}

/* Hide scrollbar in Chrome/Safari */
  .tab-group--bottom .tab-group__nav::-webkit-scrollbar {
    width: 0;
    height: 0;
}

.tab-group--bottom .tab-group__tabs {
    flex: 1 1 auto;
    position: relative;
    flex-direction: row;
    border-top: solid 2px var(--track-color);
}

.tab-group--bottom .tab-group__indicator {
    top: calc(-1 * 2px);
    border-top: solid 2px var(--indicator-color);
}

.tab-group--bottom .tab-group__body {
    order: 1;
}

.tab-group--bottom ::slotted(al-tab-panel) {
    --padding: 16px 0;
}

/*
* Start
*/
.tab-group--start {
    flex-direction: row;
}

.tab-group--start .tab-group__nav-container {
    order: 1;
}

.tab-group--start .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-right: solid 2px var(--track-color);
}

.tab-group--start .tab-group__indicator {
    right: calc(-1 * 2px);
    border-right: solid 2px var(--indicator-color);
}

.tab-group--start .tab-group__body {
    flex: 1 1 auto;
    order: 2;
}

.tab-group--start ::slotted(al-tab-panel) {
    --padding: 0 16px;
}

/*
* End
*/
.tab-group--end {
    flex-direction: row;
}

.tab-group--end .tab-group__nav-container {
    order: 2;
}

.tab-group--end .tab-group__tabs {
    flex: 0 0 auto;
    flex-direction: column;
    border-left: solid 2px var(--track-color);
}

.tab-group--end .tab-group__indicator {
    left: calc(-1 * 2px);
    border-left: solid 2px var(--indicator-color);
}

.tab-group--end .tab-group__body {
    flex: 1 1 auto;
    order: 1;
}

.tab-group--end ::slotted(al-tab-panel) {
    --padding: 0 16px;
}

`;