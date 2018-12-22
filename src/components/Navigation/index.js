import React from "react";
import styled from "styled-components";
import { Link as GatsbyLink } from "gatsby";

const Navigation = styled.nav`
    display: flex;
`;

const Link = styled(GatsbyLink)`
    display: block;
    padding: 0 .75rem;
    color: #ffffff;
    text-decoration: none;
    font-weight: ${props => props.theme.font.weight.bold};

    &:hover,
    &:focus,
    &.active {
        color: ${props => props.theme.color.primary};

        /* text-decoration: underline; */
    }
`;

const links = [
    { name: "Nieuws", to: "/nieuws" },
    { name: "Interviews", to: "/interviews" },
    { name: "Reviews", to: "/reviews" },
    { name: "Live reviews", to: "/live-reviews" },
];

export default () => (
    <Navigation>
        { links.map(({ name, to }) => <Link key={name} to={to}>{ name }</Link>) }
    </Navigation>
);
