import React from "react";
import styled from "styled-components";
import { InstantSearch, Hits, SearchBox } from "react-instantsearch-dom";
// import { py } from "styled-components-spacing";
// import breakpoint from "styled-components-breakpoint";
import Layout from "../components/Layout";
import Container from "../components/Container";

const Intro = styled.div`
    letter-spacing: -.5px;
`;

export default () => (
    <Layout>
        <Container>
            <Intro>Search</Intro>
            <InstantSearch
                appId={process.env.GATSBY_ALGOLIA_APP_ID}
                apiKey={process.env.GATSBY_ALGOLIA_SEARCH_API_KEY}
                indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
            >
                <header>
                    <SearchBox />
                </header>
                <section>
                    <Hits />
                </section>

            </InstantSearch>
        </Container>
    </Layout>
);
