import { createGlobalStyle } from "styled-components";
import { mb, pl } from "styled-components-spacing";

export default createGlobalStyle`
    @import url("${({ theme }) => theme.font.import}");

    html {
        box-sizing: border-box;
        font-size: ${({ theme }) => theme.font.size.default}px;
    }

    *,
    *:before,
    *:after {
        box-sizing: inherit;
    }

    body {
        font-family: ${({ theme }) => theme.font.family.default};
        font-size: ${({ theme }) => theme.font.size.md}rem;
        letter-spacing: -.5px;
        line-height: ${({ theme }) => theme.leading.normal};
        color: ${({ theme }) => theme.color.text};
        background-color: ${({ theme }) => theme.color.body};
        overflow-x: hidden;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: ${({ theme }) => theme.color.headings};
        margin: 1.5rem 0;
    }

    h1,
    h2,
    h3 {
        font-family: ${({ theme }) => theme.font.family.headings};
        letter-spacing: 0;
        font-weight: ${({ theme }) => theme.font.weight.headings};
        line-height: ${({ theme }) => theme.leading.none};
    }

    h1 { font-size: ${({ theme }) => theme.font.size.xxxxl}rem; }
    h2 { font-size: ${({ theme }) => theme.font.size.xxxl}rem; }
    h3 { font-size: ${({ theme }) => theme.font.size.xxl}rem; }
    h4 { font-size: ${({ theme }) => theme.font.size.xl}rem; }
    h5 { font-size: ${({ theme }) => theme.font.size.lg}rem; }

    figure {
        padding: 0;
        margin: 0;
    }

    p,
    ul,
    address,
    blockquote,
    ol {
        margin: 0;
        ${mb(4)};
    }

    a {
        color: ${({ theme }) => theme.color.primary[5]};
        text-decoration: underline;

        &:hover,
        &:focus,
        &:active {
            color: ${({ theme }) => theme.color.primary[5]};
        }
    }

    pre {
        font-family: "Dank Mono", monospace;
        font-size: 11px;
        letter-spacing: .125px;
        padding: 1rem;
        background: #333333;
        color: #dddddd;
    }

    blockquote {
        ${pl(6)};
        border-left: 3px solid ${({ theme }) => theme.color.gray[5]};
    }
`;
