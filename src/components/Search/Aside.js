import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import {
    py, px,
} from "styled-components-spacing";

export const Aside = styled.aside`
    grid-area: sidebar;
    ${breakpoint("md")`
        border-left: 1px solid ${({ theme }) => theme.color.gray[3]};
    `}
`;

export const Sticky = styled.div`
    position: sticky;
    top: 0;
    ${py(6)}
    ${breakpoint("md")`
        ${px(6)}
    `}
`;
