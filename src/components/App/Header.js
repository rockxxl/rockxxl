import React, { useContext } from "react";
import styled from "styled-components";
import { px } from "styled-components-spacing";
import breakpoint from "styled-components-breakpoint";
import { OffCanvasContext } from "../OffCanvasMenu/Context";
import Brand from "../Brand";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";
import Container from "../Container";
import Button from "../Button";

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

const Nav = styled(Navigation)`
    display: none;
    ${breakpoint("md")` display: flex; `}
`;

const SocMed = styled(SocialMedia)`
    display: none;
    ${breakpoint("md")` display: flex; `}
`;

const OffCanvasToggle = styled(Button)`
    display: block;
    ${breakpoint("md")` display: none; `}
`;

export default () => {
    const {
        state: { offCanvasMenu },
        dispatch,
    } = useContext(OffCanvasContext);

    return (
        <Header>
            <Wrapper>
                <Brand />
                <Nav />
                <SocMed />
                <OffCanvasToggle
                    reset
                    variant="white"
                    type="button"
                    onClick={() => dispatch({ type: "TOGGLE" })}
                >
                    {offCanvasMenu.icon}
                </OffCanvasToggle>
            </Wrapper>
        </Header>
    );
};
