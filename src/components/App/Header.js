import React from "react";
import styled from "styled-components";
import Brand from "../Brand";
import Navigation from "../Navigation";

const Header = styled.header`
    background: #000;
    color: #fff;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export default () => (
    <Header>
        <Brand />
        <Navigation />
    </Header>
);
