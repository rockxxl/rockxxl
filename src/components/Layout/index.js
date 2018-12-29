import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { Helmet } from "react-helmet";
import GlobalStyle from "./GlobalStyle";
import theme from "../../theme";
import Header from "../App/Header";
import Footer from "../App/Footer";
import defaultOgImage from "../Brand/og-image.png";


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

    & > * {
        width: 100%;
    }
`;

export default ({ children }) => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        title
                    }
                }
            }
        `}
        render={({ site: { siteMetadata: { title } } }) => (
            <ThemeProvider theme={theme}>
                <App>
                    <Helmet
                        title={title}
                        titleTemplate={`%s | ${title}`}
                        meta={[
                            { httpEquiv: "Accept-CH", content: "DPR, Viewport-Width, Width" },
                            { property: "og:locale", content: "nl_BE" },
                            { property: "og:site_name", content: "RockXXL" },
                            { property: "og:image", content: defaultOgImage },
                            { property: "og:image:width", content: 1200 },
                            { property: "og:image:height", content: 630 },
                            { property: "og:type", content: "article" },
                        ]}
                    >
                        <html lang="nl" />
                    </Helmet>
                    <Normalize />
                    <GlobalStyle />
                    <Header />
                    <Main>{children}</Main>
                    <Footer />
                </App>
            </ThemeProvider>
        )}
    />
);
