import CMS from "netlify-cms";
import React from "react";
import { StyleSheetManager } from "styled-components";

import Post from "./preview-templates/Post";


CMS.registerPreviewTemplate("post", (props) => {
    const iframe = document.getElementsByTagName("iframe")[0];
    const iframeHeadElem = iframe.contentDocument.head;
    return (
        <StyleSheetManager target={iframeHeadElem}>
            <Post {...props} />
        </StyleSheetManager>
    );
});
