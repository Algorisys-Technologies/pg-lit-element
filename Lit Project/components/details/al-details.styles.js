import { css } from "lit";

export default css`
    :host {
        display: block;
    }

    .details {
        border: solid 1px hsl(240 5.9% 90%);
        border-radius: 4px;
        background-color: hsl(0, 0%, 100%);
    }
    
    .details--disabled {
        opacity: 0.5;
    }
    
    .details__header {
        display: flex;
        align-items: center;
        border-radius: inherit;
        padding: 16px;
        user-select: none;
        cursor: pointer;
    }
    
    .details__header:focus {
        outline: none;
    }
    
    .details--disabled .details__header {
        cursor: not-allowed;
    }
    
    .details__summary {
        flex: 1 1 auto;
        display: flex;
        align-items: center;
    }
    
    .details__summary-icon {
        flex: 0 0 auto;
        display: flex;
        align-items: center;
        transition: 250ms transform ease;
    }
    
    .details--open .details__summary-icon {
        transform: rotate(90deg);
    }
    
    .details__body {
        overflow: hidden;
    }
    
    .details__content {
        padding: 16px;
    }
`;