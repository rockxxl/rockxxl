import React from "react";
import { connectSearchBox } from "react-instantsearch-dom";
import Input from "../Form/Input";

const SearchBox = ({ currentRefinement, refine }) => (
    <Input
        type="text"
        value={currentRefinement}
        onChange={e => refine(e.target.value)}
        placeholder="Naar wat ben je op zoek?"
    />
);

export default connectSearchBox(SearchBox);
