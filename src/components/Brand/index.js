import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";

import logo from "./logo.png";

const Logo = styled.img`
    height: 3rem;
`;

export default () => (
    <Link to="/">
        <Logo src={logo} alt="Rock XXL" />
    </Link>
);
