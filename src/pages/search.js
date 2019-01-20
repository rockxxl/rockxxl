import React from "react";
import styled from "styled-components";
import {
    InstantSearch, Hits,
} from "react-instantsearch-dom";

import { py } from "styled-components-spacing";
import SearchBox from "../components/Search/SearchBox";
import Hit from "../components/Search/Hit";
import Layout from "../components/Layout";
import Container from "../components/Container";

const Wrapper = styled(Container)`
    ${py(6)}
`;

export default () => (
    <Layout>
        <Wrapper>
            <InstantSearch
                appId={process.env.GATSBY_ALGOLIA_APP_ID}
                apiKey={process.env.GATSBY_ALGOLIA_SEARCH_API_KEY}
                indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
            >
                <SearchBox />
                <Hits hitComponent={Hit} />
            </InstantSearch>
        </Wrapper>
    </Layout>
);
