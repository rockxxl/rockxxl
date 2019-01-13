import React from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import App from "./App";
import ErrorBoundary from "../Error/Boundary";
import Footer from "../App/Footer";
import GlobalStyle from "./GlobalStyle";
import Header from "../App/Header";
import Main from "./Main";
import SEO from "../SEO";
import theme from "../../theme";


export default ({ children }) => (
    <ErrorBoundary>
        <ThemeProvider theme={theme}>
            <App>
                <SEO />
                <Normalize />
                <GlobalStyle />
                <Header />
                <Main>{children}</Main>
                <Footer />
            </App>
        </ThemeProvider>
    </ErrorBoundary>
);
