import React from "react";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "./GlobalStyle";
import theme from "../../../theme";
import Header from "../App/Header";
import Footer from "../App/Footer";


const App = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
`;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    align-items: center;
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
