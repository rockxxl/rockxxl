import React, { useState } from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Input from "../Form/Input";

const Group = styled.div`
    position: relative;
`;

const Icon = styled(FontAwesomeIcon)`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 1.5rem;

    &.active {
        color: ${({ theme }) => theme.input.focus.border.color};
    }
`;

const SearchBox = ({ currentRefinement, refine, className }) => {
    const [focused, setFocused] = useState(false);
    return (
        <Group>
            <Input
                type="text"
                className={className}
                value={currentRefinement}
                onChange={e => refine(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="Naar wat ben je op zoek?"
            />
            <Icon
                icon={faSearch}
                size="lg"
                className={focused ? "active" : null}
            />
        </Group>
    );
};

export default connectSearchBox(SearchBox);
