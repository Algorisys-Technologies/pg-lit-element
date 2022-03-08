import { css } from "lit";

export default css`
    :host {
        display:block;
    }

    .radio-group {
        border: solid 1px hsl(240 5.9% 90%);
        border-radius: 4px;
        padding: 20px;
        padding-top: 8px;
    }

    .radio-group .radio-group__label {
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 16px;
        font-weight: 400;
        color: hsl(240 5.3% 26.1%);
        padding: 0 4px;
    }

    ::slotted(al-radio:not(:last-of-type)) {
        display: block;
        margin-bottom: 4px;
    }

    .radio-group:not(.radio-group--has-fieldset) {
        border: none;
        padding: 0;
        margin: 0;
        min-width: 0;
    }

    .radio-group:not(.radio-group--has-fieldset) .radio-group__label {
        position: absolute;
        width: 0;
        height: 0;
        clip: rect(0 0 0 0);
        clip-path: inset(50%);
        overflow: hidden;
        white-space: nowrap;
    }
`;