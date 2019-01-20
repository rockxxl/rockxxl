import React, { useContext } from "react";
import styled from "styled-components";
import { px } from "styled-components-spacing";
// import breakpoint from "styled-components-breakpoint";
import MediaQuery from "react-responsive";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import theme from "../../theme";
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

export default () => {
    const {
        state: { offCanvasMenu },
        dispatch,
    } = useContext(OffCanvasContext);

    return (
        <Header>
            <Wrapper>
                <Brand />
                <MediaQuery query={`(min-width: ${theme.breakpoints.notMobile}px)`}>
                    <Navigation />
                    <SocialMedia />
                </MediaQuery>
                <MediaQuery query={`(max-width: ${theme.breakpoints.notMobile - 1}px)`}>
                    <Button
                        reset
                        variant="white"
                        type="button"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                    >
                        <FontAwesomeIcon
                            icon={offCanvasMenu.icon}
                            size="lg"
                        />
                    </Button>
                </MediaQuery>
            </Wrapper>
        </Header>
    );
};
