import React from "react";
import styled from "styled-components";
import { px } from "styled-components-spacing";
import Brand from "../Brand";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";
import Container from "../Container";


const Header = styled.header`
    background: #000000;
    color: #ffffff;
`;

const Wrapper = styled(Container)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${px(6)};
`;


export default () => (
    <Header>
        <Wrapper>
            <Brand />
            <Navigation />
            <SocialMedia />
        </Wrapper>
    </Header>
);
