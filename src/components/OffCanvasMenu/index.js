import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { px, py } from "styled-components-spacing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OffCanvasContext } from "./Context";
import Container from "../Container";
import Button from "../Button";
import Brand from "../Brand";
import Navigation from "../Navigation";
import SocialMedia from "../SocialMedia";

const Menu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 99999;
    overflow: scroll;
`;

const Overflow = styled.div`
    width: 100vw;
    min-height: 100vh;
    background: #000000;
    color: #ffffff;
    display: flex;
    flex-direction: column;
`;

const Wrapper = styled(Container)`
    display: flex;
    justify-content: center;
    align-items: center;
    ${px(6)};
`;

const Header = styled(Wrapper)`
    justify-content: space-between;
`;

const Footer = styled(Wrapper)`
    ${py(3)};
`;

const Content = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
`;

const Nav = styled(Navigation)`
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default () => {
    const {
        state: { offCanvasMenu },
        dispatch,
    } = useContext(OffCanvasContext);

    return (
        <Fragment>
            {offCanvasMenu.open && (
                <Menu>
                    <Overflow>
                        <Header>
                            <Brand />
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
                        </Header>
                        <Content>
                            <Nav offCanvasMenu />
                        </Content>
                        <Footer>
                            <SocialMedia />
                        </Footer>
                    </Overflow>
                </Menu>
            )}
        </Fragment>
    );
};
