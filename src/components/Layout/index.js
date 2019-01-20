import React from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import MediaQuery from "react-responsive";
import App from "./App";
import ErrorBoundary from "../Error/Boundary";
import Footer from "../App/Footer";
import GlobalStyle from "./GlobalStyle";
import Header from "../App/Header";
import Main from "./Main";
import SEO from "../SEO";
import theme from "../../theme";
import OffCanvasMenu from "../OffCanvasMenu";
import { OffCanvasProvider } from "../OffCanvasMenu/Context";


export default ({ children }) => (
    <ErrorBoundary>
        <ThemeProvider theme={theme}>
            <OffCanvasProvider>
                <App>
                    <SEO />
                    <Normalize />
                    <GlobalStyle />
                    <Header />
                    <Main>{children}</Main>
                    <Footer />
                    <MediaQuery query={`(max-width: ${theme.breakpoints.notMobile - 1}px)`}>
                        <OffCanvasMenu />
                    </MediaQuery>
                </App>
            </OffCanvasProvider>
        </ThemeProvider>
    </ErrorBoundary>
);
