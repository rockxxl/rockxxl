exports.onClientEntry = () => {
    // Object-fit/Object-position polyfill for gatsby-image (IE)
    const testImg = document.createElement("img");
    if (
        typeof testImg.style.objectFit === "undefined" || typeof testImg.style.objectPosition === "undefined"
    ) {
        import("object-fit-images").then(({ default: ObjectFitImages }) => ObjectFitImages());
        console.log("👍 Object-fit/Object-position are polyfilled"); // eslint-disable-line
    }
};
