import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import logo from "./logo.png";

const Logo = styled.img`
    height: 4.5rem;
    padding: 1.5rem 0;
    display: block;
`;

export default () => (
    <Link to="/">
        <Logo src={logo} alt="Rock XXL" />
    </Link>
);
