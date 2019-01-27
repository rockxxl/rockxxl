import {
    px, mb, mr, ml,
} from "styled-components-spacing";
import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

    .ais-InstantSearch__root {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .ais-RefinementList-list {
        list-style: none;
        padding: 0;
        ${mb(6)}
    }

    .ais-RefinementList-label {
        display: flex;
        align-items: center;
    }

    .ais-RefinementList-checkbox {
        ${mr(1)}
    }

    .ais-RefinementList-count {
        font-size: ${({ theme }) => theme.font.size.xs}rem;
        background-color: ${({ theme }) => theme.color.gray[3]};
        border-radius: 12rem;
        ${ml(1)}
        ${px(1)}
    }

    .ais-PoweredBy {
        display: flex;
        align-items: center;
        font-size: ${({ theme }) => theme.font.size.xs}rem;
    }

    .ais-PoweredBy-link {
        display: flex;
    }
`;
