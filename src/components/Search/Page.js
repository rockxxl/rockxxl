import React, { Fragment, Component } from "react";
import {
    InstantSearch,
    PoweredBy,
    RefinementList,
    Hits,
    connectStateResults,
} from "react-instantsearch-dom";
import qs from "qs";

import withLocation from "../Router/withLocation";

import {
    Aside,
    Sticky,
    Content,
    Empty,
    Header,
    Hit,
    SearchBox,
    Styles,
} from ".";

const DEBOUNCE_TIME = 400;
const createURL = state => `?${qs.stringify(state)}`;

// const searchStateToUrl = (props, searchState) => (searchState ? `${props.location.pathname}${createURL(searchState)}` : "");

const urlToSearchState = location => qs.parse(location.search.slice(1));

const Results = connectStateResults(
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

class Search extends Component {
    /* eslint-disable react/destructuring-assignment */
    state = {
        searchState: urlToSearchState(this.props.location),
        lastLocation: this.props.location,
    }
    /* eslint-enable react/destructuring-assignment */

    static getDerivedStateFromProps(props, state) {
        if (props.location !== state.lastLocation) {
            return {
                searchState: urlToSearchState(props.location),
                lastLocation: props.location,
            };
        }

        return null;
    }

    onSearchStateChange = (searchState) => {
        clearTimeout(this.debouncedSetState);

        this.debouncedSetState = setTimeout(() => {
            const { navigate } = this.props;
            navigate(createURL(searchState));

            // navigate.push(
            //     searchStateToUrl(this.props, searchState),
            //     searchState,
            // );
        }, DEBOUNCE_TIME);

        this.setState({ searchState });
    };

    render() {
        const { state, onSearchStateChange } = this;
        return (
            <Fragment>
                <Styles />
                <InstantSearch
                    appId={process.env.GATSBY_ALGOLIA_APP_ID}
                    apiKey={process.env.GATSBY_ALGOLIA_SEARCH_API_KEY}
                    indexName={process.env.GATSBY_ALGOLIA_INDEX_NAME}
                    searchState={state.searchState}
                    onSearchStateChange={onSearchStateChange}
                    createURL={createURL}
                >
                    <Results />
                </InstantSearch>
            </Fragment>
        );
    }
}

export default withLocation(Search);
