import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { Normalize } from "styled-normalize";
import Header from "./App/Header";
import Footer from "./App/Footer";


const GlobalStyle = createGlobalStyle`
    body {
        font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
        font-size: 16px;
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
    <App>
        <Normalize />
        <GlobalStyle />
        <Header />
        <Main>{children}</Main>
        <Footer />
    </App>
);
