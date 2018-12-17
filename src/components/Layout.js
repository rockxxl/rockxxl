import React from "react";
import styled, { createGlobalStyle, ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import theme from "./theme";
import Header from "./App/Header";
import Footer from "./App/Footer";

const GlobalStyle = createGlobalStyle`
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

const App = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.div`
    flex-grow: 1;
`;

export default ({ children }) => (
    <ThemeProvider theme={theme}>
        <App>
            <Normalize />
            <GlobalStyle />
            <Header />
            <Main>{children}</Main>
            <Footer />
        </App>
    </ThemeProvider>
);
