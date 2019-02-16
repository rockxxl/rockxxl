import cloudinary from "cloudinary-core";
import { getPublicId } from "../../Image";

export default (image) => {
    const cldnry = new cloudinary.Cloudinary({ cloud_name: process.env.GATSBY_CLOUDINARY_CLOUD_NAME });
    const publidId = image.includes("res.cloudinary.com") ? getPublicId(image) : image;
    return cldnry.url(publidId, {
        transformation: [
            {
                dpr: "1.0", effect: "blur:2000", gravity: "center", height: 630, width: 1200, crop: "fill",
            },
            { fetch_format: "jpg" },
            {
                gravity: "center", height: 530, overlay: publidId, width: 1100, crop: "lpad",
            },
            { gravity: "south_east", overlay: "logoROCKXXLwitv2" },
        ],
    });
};
