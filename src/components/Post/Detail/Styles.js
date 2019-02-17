import styled from "styled-components";
import { p, mb, mr } from "styled-components-spacing";
import breakpoint from "styled-components-breakpoint";

export const H1 = styled.h1`
    ${mb(5)};
`;

export const Grid = styled.div`
    flex-grow: 1;
    max-width: 1440px;
    width: 100%;
    ${breakpoint("md")`
        display: grid;
        grid-template-columns: 1fr 320px;
    `}
`;

export const Sidebar = styled.aside`
    ${breakpoint("md")`
        width: 320px;
        border-left: 1px solid ${props => props.theme.color.gray[3]};
    `}
`;

export const Sticky = styled.div`
    position: sticky;
    top: 0;
`;

export const Scroll = styled.div`
    overflow-y: scroll;
`;

export const Content = styled.article`
    display: flex;
    flex-direction: column;
    ${p(6)};
    ${breakpoint("md")`
        align-items: center;
    `}
`;

export const Header = styled.header`
    width: 100%;
    max-width: 960px;
    ${mb(6)};
`;

export const Section = styled.section`
    width: 100%;
    line-height: ${props => props.theme.leading.loose};
    ${breakpoint("md")`
        max-width: 640px;
    `}
`;

export const Media = styled.div`
    ${mb(3)};
    ${breakpoint("sm")`
        max-width: 320px;
        width: 50%;
        float: left;
        ${mr(6)};
    `}

    ${breakpoint("lg")`
        margin-left: -25%;
    `}
`;
