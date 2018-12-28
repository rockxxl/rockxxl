import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    @import url("${props => props.theme.font.family.import}");

    html {
        box-sizing: border-box;
        font-size: ${props => props.theme.font.size.default}px;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        font-family: ${props => props.theme.font.family.default};
        font-size: ${props => props.theme.font.size.md}rem;
        letter-spacing: -.5px;
        line-height: ${props => props.theme.leading.normal};
        color: ${props => props.theme.color.text};
        background-color: ${props => props.theme.color.body};
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${props => props.theme.color.headings};
    }

    h1,
    h2,
    h3 {
        font-family: ${props => props.theme.font.family.headings};
        letter-spacing: 0;
        font-weight: ${props => props.theme.font.weight.headings};
        line-height: ${props => props.theme.leading.none};
    }

    h1 { font-size: ${props => props.theme.font.size.xxxxl}rem; }
    h2 { font-size: ${props => props.theme.font.size.xxxl}rem; }
    h3 { font-size: ${props => props.theme.font.size.xxl}rem; }
    h4 { font-size: ${props => props.theme.font.size.xl}rem; }
    h5 { font-size: ${props => props.theme.font.size.lg}rem; }

    figure {
        padding: 0;
        margin: 0;
    }
`;
