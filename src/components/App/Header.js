import React, { useContext } from "react";
import { navigate } from "gatsby";
import styled from "styled-components";
import {
    px, mr, ml, p,
} from "styled-components-spacing";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
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

const Center = styled.div`
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Actions = styled.div`
    display: flex;
    ${ml(6)}
    ${mr(-6)}
`;


const Btn = styled(Button)`
    ${p(6)}
    border-left: 1px solid rgba(255, 255, 255, .5);
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
                <Center>
                    <MediaQuery query={`(min-width: ${theme.breakpoints.notMobile}px)`}>
                        <Navigation />
                        <SocialMedia />
                    </MediaQuery>
                </Center>
                <Actions>


                    <Btn
                        reset
                        variant="white"
                        type="button"
                        onClick={() => navigate("/search")}
                    >
                        <FontAwesomeIcon
                            icon={faSearch}
                            size="lg"
                        />
                    </Btn>
                    <MediaQuery query={`(max-width: ${theme.breakpoints.notMobile - 1}px)`}>
                        <Btn
                            reset
                            variant="white"
                            type="button"
                            onClick={() => dispatch({ type: "TOGGLE" })}
                            role="link"
                        >
                            <FontAwesomeIcon
                                icon={offCanvasMenu.icon}
                                size="lg"
                            />
                        </Btn>
                    </MediaQuery>
                </Actions>
            </Wrapper>
        </Header>
    );
};
