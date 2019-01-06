import React from "react";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import GlobalStyle from "./GlobalStyle";
import theme from "../../theme";
import App from "./App";
import Main from "./Main";

export default ({ children }) => (
    <ThemeProvider theme={theme}>
        <App>
            <Normalize />
            <GlobalStyle />
            <Main>{children}</Main>
        </App>
    </ThemeProvider>
);
