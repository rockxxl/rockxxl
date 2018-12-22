import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @import url(${props => props.theme.font.family.import});

    html {
        font-size: ${props => props.theme.font.size.default}px;
    }

    body {
        font-family: ${props => props.theme.font.family.default};
        font-size: ${props => props.theme.font.size.md}rem;
        letter-spacing: -.5px;
    }

    h1,
    h2,
    h3 {
        font-family: ${props => props.theme.font.family.headings};
        letter-spacing: 0;
        font-weight: ${props => props.theme.font.weight.headings};
    }
`;
