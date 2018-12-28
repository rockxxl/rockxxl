import React, { Component, createRef } from "react";
import styled from "styled-components";
import cloudinary from "cloudinary-core";
import withIntersectionObserver from "./withIntersectionObserver";

const Image = styled.img`
    width: 100%;
    display: block;
    transition: opacity .25s ease-in-out, filter .25s ease-in-out, transform .25s ease-in-out;
    opacity: ${({ styled: { loaded } }) => (loaded ? 1 : 0)};
    /* filter: ${({ styled: { loaded } }) => (loaded ? "none" : "blur(50px)")}; */
    /* transform: ${({ styled: { loaded } }) => (loaded ? "none" : "scale(1.5, 1.5)")}; */

    /* transform-origin: 50% 50%; */
    ${({ styled: { fit } }) => fit && `
        position: absolute
        top: 0;
        left: 0;
        height: 100%;
        object-fit: cover
    `}
`;

const Figure = styled.figure`
    position: relative;
    background-color: ${props => props.theme.color.extremelyLight};
    overflow: hidden;
    padding-bottom: ${(({ aspectRatio }) => {
        const [width, height] = aspectRatio.split(":");
        const ratio = height / width * 100;
        return `${ratio}%`;
    })};
`;

class ImageLazyLoader extends Component {
    constructor(props) {
        super(props);
        this.image = createRef();
        this.state = {
            isLoaded: false,
            srcSet: null,
            src: null,
            sizes: "1px",
            srcSetSizes: [150, 300, 600, 900, 1200, 1500, 1800, 2100, 2400],
            cldnry: {
                core: new cloudinary.Cloudinary({ cloud_name: process.env.GATSBY_CLOUDINARY_CLOUD_NAME }),
                defaultOptions: {
                    dpr: 1,
                    crop: "scale",
                },
            },
        };
    }

    componentDidMount() {
        this.generateSrcSet();
    }

    componentDidUpdate() {
        const {
            setSizes,
            props: { isVisible },
            state: { sizes },
        } = this;

        if (isVisible && sizes === "1px") setSizes();
    }

    setSizes = () => {
        const image = this.image.current;
        const { naturalWidth, naturalHeight } = image;
        const { height, width } = image.getBoundingClientRect();
        const imageWidthRatio = naturalWidth / naturalHeight;

        const roundedWidth = Math.max(
            width,
            height * imageWidthRatio,
        );

        this.setState({
            sizes: `${Number.isNaN(roundedWidth) ? width : roundedWidth}px`,
        });
    }


    imageLoaded = () => {
        this.setState({
            isLoaded: true,
        });
    }

    generateSrcSet() {
        const { publicId } = this.props;
        const { srcSetSizes, cldnry } = this.state;
        const src = `${cldnry.core.url(publicId, { transformation: "responsive_placeholder" })} 1w`;

        this.setState({
            src,
            srcSet: [
                ...[src],
                ...srcSetSizes.map((size) => {
                    const url = cldnry.core.url(publicId, { ...cldnry.defaultOptions, width: size });
                    return `${url} ${size}w`;
                }),
            ],
        });
    }

    render() {
        const { isVisible, alt, aspectRatio } = this.props;
        const {
            isLoaded, src, srcSet, sizes,
        } = this.state;

        const image = (
            isVisible
                && (
                    <Image
                        ref={this.image}
                        src={src}
                        srcSet={srcSet}
                        onLoad={() => this.imageLoaded()}
                        onError={() => this.imageLoaded()}
                        styled={{
                            fit: aspectRatio !== null,
                            loaded: isLoaded,
                        }}
                        sizes={sizes}
                        alt={alt}
                    />
                )
        );

        return (
            <Figure aspectRatio={aspectRatio}>{image}</Figure>
        );
    }
}

export default withIntersectionObserver({
    threshold: 0,
    rootMargin: "1000px 0px",
})(ImageLazyLoader);
