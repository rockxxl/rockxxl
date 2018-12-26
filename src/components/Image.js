import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import { Image as CloudinaryImage } from "cloudinary-react";

const Image = styled(CloudinaryImage)`
    width: 100%;
    display: block;
`;

export default ({ publicId }) => (
    <StaticQuery
        query={graphql`
            query {
                site {
                    siteMetadata {
                        cldnryCloudName
                    }
                }
            }
        `}
        render={({ site: { siteMetadata: { cldnryCloudName } } }) => (
            <Image
                cloudName={cldnryCloudName}
                publicId={publicId}
                responsive
                dpr="auto"
                width="auto"
                crop="scale"
            />
        )}
    />
);
