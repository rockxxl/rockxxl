import React, { useContext, Fragment } from "react";
import styled from "styled-components";
// import { px } from "styled-components-spacing";
import { OffCanvasContext } from "./Context";
import Button from "../Button";

const Menu = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #000000;
    color: #ffffff;
    z-index: 99999;
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
                    <Button
                        type="button"
                        variant="primary"
                        onClick={() => dispatch({ type: "TOGGLE" })}
                    >
                        {offCanvasMenu.text}
                    </Button>
                </Menu>
            )}
        </Fragment>
    );
};
