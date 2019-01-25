import React, { Fragment } from "react";
import styled, { createGlobalStyle } from "styled-components";
import {
    InstantSearch,
    PoweredBy,
    RefinementList,
    Hits,
    connectStateResults,
} from "react-instantsearch-dom";
import {
    py, px, mb, mr, ml,
} from "styled-components-spacing";
import breakpoint from "styled-components-breakpoint";
// import Results from "../components/Search/Results";
import SearchBox from "../components/Search/SearchBox";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Hit from "../components/Search/Hit";

const Styles = createGlobalStyle`

    .ais-InstantSearch__root {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .ais-RefinementList-list {
        list-style: none;
        padding: 0;
        ${mb(6)}
    }

    .ais-RefinementList-label {
        display: flex;
        align-items: center;
    }

    .ais-RefinementList-checkbox {
        ${mr(1)}
    }

    .ais-RefinementList-count {
        font-size: ${({ theme }) => theme.font.size.xs}rem;
        background-color: ${({ theme }) => theme.color.gray[3]};
        border-radius: 12rem;
        ${ml(1)}
        ${px(1)}
    }

    .ais-PoweredBy {
        display: flex;
        align-items: center;
        font-size: ${({ theme }) => theme.font.size.xs}rem;
    }

    .ais-PoweredBy-link {
        display: flex;
    }
`;

const Header = styled.div`
    grid-area: header;
`;

const Content = styled(Container)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow: 1;
    max-width: 30rem;
    margin: 0 auto;
    width: 100%;
    ${py(6)}

    &.active {
        display: block;
        margin: 0;
        max-width: none;
        ${breakpoint("md")`
            display: grid;
            grid-template-areas: "header   header"
                "content sidebar";
            grid-template-columns: 1fr 320px;
        `}
    }
`;

const Aside = styled.aside`
    grid-area: sidebar;
    ${breakpoint("md")`
        border-left: 1px solid ${({ theme }) => theme.color.gray[3]};
    `}
`;

const Sticky = styled.div`
    position: sticky;
    top: 0;
    ${py(6)}
    ${breakpoint("md")`
        ${px(6)}
    `}
`;

const Empty = styled.div`
    ${py(6)}
`;

const Search = connectStateResults(
    ({ searchState, searchResults }) => {
        const active = searchState.query && searchState.query.length > 0;
        return (
            <Content className={active ? "active" : null}>
                <Header>
                    <SearchBox autoFocus />
                </Header>
                {active && (
                    <Fragment>
                        {
                            searchResults && searchResults.hits.length === 0
                                ? <Empty>Geen resultaten gevonden</Empty>
                                : (
                                    <Fragment>
                                        <Aside>
                                            <Sticky>
                                                <RefinementList attribute="category" />
                                                <PoweredBy />
                                            </Sticky>
                                        </Aside>
                                        <Hits hitComponent={Hit} />
                                    </Fragment>
                                )
                        }
                    </Fragment>
                )}
            </Content>
        );
    },
);

export default () => (
    <Layout>
        <Styles />
        <InstantSearch
            appId={process.env.GATSBY_ALGOLIA_APP_ID}
            apiKey={process.env.GATSBY_ALGOLIA_SEARCH_API_KEY}
            indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
        >
            <Search />
        </InstantSearch>
    </Layout>
);
