import React, { useContext, Fragment } from "react";
import { OffCanvasContext } from "./Context";

export default () => {
    const { state: { offCanvasMenu } } = useContext(OffCanvasContext);

    return (
        <Fragment>
            {offCanvasMenu.open && (<div>check</div>)}
        </Fragment>
    );
};
