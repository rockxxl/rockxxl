import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import {
    py,
} from "styled-components-spacing";
import Container from "../Container";

export default styled(Container)`
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
