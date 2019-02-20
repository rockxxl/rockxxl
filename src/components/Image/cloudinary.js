import { Cloudinary } from "cloudinary-core";

export const config = {
    srcSetSizes: [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2400],
    core: new Cloudinary({ cloud_name: process.env.GATSBY_CLOUDINARY_CLOUD_NAME }),
    defaultOptions: {
        dpr: 1,
        crop: "scale",
        fetch_format: "auto",
        quality: "auto",
    },
};

/*
    https://res.cloudinary.com/rockxxl/image/upload/gmm18lineup1200x16972-5.jpg
    https://res.cloudinary.com/rockxxl/image/upload/1761d2fe-aeec-4795-b090-8c8036dd53ad.jpg
    https://res.cloudinary.com/rockxxl/image/upload/v1548589931/40576606_1843234992457191_6678925314967470080_n.jpg
 */
export const getPublicId = input => input.replace(/(?:https:\/\/res.cloudinary.com\/.*\/image\/upload\/)(?:.*\/)?(.*)/, "$1");

export const isCloudinaryUrl = url => url.includes("https://res.cloudinary.com/");

export const getSrcSet = ({
    props: {
        publicId: publicIdProp,
        src,
        srcSet,
    },
}) => {
    if (publicIdProp || isCloudinaryUrl(src)) {
        const publicId = getPublicId(src);
        const cldnrySrc = config.core.url(publicId, { transformation: "responsive_placeholder" });

        return {
            src: cldnrySrc,
            srcSet: [
                ...[`${cldnrySrc} 32w`],
                ...config.srcSetSizes.map((size) => {
                    const url = config.core.url(publicId, { ...config.defaultOptions, width: size });
                    return `${url} ${size}w`;
                }),
            ],
        };
    }
    return {
        src,
        srcSet,
    };
};
