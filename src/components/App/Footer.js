import React from "react";
import styled from "styled-components";
import { px } from "styled-components-spacing";
import Container from "../Container";

const Footer = styled.footer`
    border-top: 1px solid ${props => props.theme.color.extremelyLight};
    color: ${props => props.theme.color.light};
    font-size: ${props => props.theme.font.size.sm}rem;
    padding: 1rem 0;
`;

const Anchor = styled.a`
    color: ${props => props.theme.color.light};
    text-decoration: underline;

    &:hover,
    &:focus {
        color: ${props => props.theme.color.text};
    }
`;

const Wrapper = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${px(6)};
`;

export default () => (
    <Footer>
        <Wrapper>
            <div>
                {"\u00A9"}
                {" "}
                2013 -
                {" "}
                { (new Date()).getFullYear() }
                {" "}
                ROCKXXL - Alle rechten voorbehouden
            </div>
            <div>
                Gebouwd met
                {" "}
                <Anchor href="https://www.gatsbyjs.org/" target="_blank" rel="noopener noreferrer">Gatsby</Anchor>
                {" "}
                &
                {" "}
                <Anchor href="https://www.netlify.com/" target="_blank" rel="noopener noreferrer">Netlify</Anchor>
                {" "}
                door
                {" "}
                <Anchor href="https://mrtnvh.com/" target="_blank" rel="noopener noreferrer">mrtnvh</Anchor>
            </div>
        </Wrapper>
    </Footer>
);
