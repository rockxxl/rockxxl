import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";

const Navigation = styled.nav`
    display: flex;
`;

const Link = styled(GatsbyLink)`
    display: block;
    padding: 0 1rem;
    color: #fff;
    text-decoration: none;

    &:hover,
    &:focus {
        text-decoration: underline;
    }
`;

const links = [
    { name: "Interviews", to: "/interviews" },
    { name: "Reviews", to: "/reviews" },
];

export default () => (
    <Navigation>
        { links.map(({ name, to }) => <Link to={to}>{ name }</Link>) }
    </Navigation>
);
