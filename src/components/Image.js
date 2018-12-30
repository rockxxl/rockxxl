import React, { Component, createRef } from "react";
import styled from "styled-components";
import cloudinary from "cloudinary-core";
import withIntersectionObserver from "./withIntersectionObserver";

const Image = styled.img`
    width: 100%;
    display: block;
    transition: opacity .25s ease-in-out;
    opacity: ${({ styled: { loaded } }) => (loaded ? 1 : 0)};
    position: relative;
    z-index: 2;
    ${({ styled: { fit } }) => fit && `
        position: absolute
        top: 0;
        left: 0;
        height: 100%;
        object-fit: cover;

    `}
`;

const Figure = styled.figure`
    position: relative;
    background-color: ${props => props.theme.color.extremelyLight};
    ${({ aspectRatio }) => aspectRatio && `
        overflow: hidden;
        padding-bottom: ${`${aspectRatio.split(":")[1] / aspectRatio.split(":")[0] * 100}%`};
    `}
`;

const Placeholder = styled.div`
    overflow: hidden;

    &,
    &:after {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    &:after {
        transform: scale(2);
        transform-origin: 50% 50%;
        display: block;
        content: "";
        background-image: url(${({ styled: { backgroundImage } }) => backgroundImage});
        background-size: cover;
        filter: blur(25px);
    }
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
                    fetch_format: "auto",
                    quality: "auto",
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
        const src = cldnry.core.url(publicId, { transformation: "responsive_placeholder" });

        this.setState({
            src: cldnry.core.url(publicId, { transformation: "responsive_placeholder" }),
            srcSet: [
                ...[`${src} 32w`],
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

        return (
            <Figure aspectRatio={aspectRatio}>
                {isVisible && (
                    <Image
                        ref={this.image}
                        src={src}
                        srcSet={srcSet}
                        onLoad={() => this.imageLoaded()}
                        onError={() => this.imageLoaded()}
                        styled={{
                            fit: aspectRatio,
                            loaded: isLoaded,
                        }}
                        sizes={sizes}
                        alt={alt}
                    />
                )}
                <Placeholder
                    styled={{
                        backgroundImage: src,
                        loaded: isLoaded,
                    }}
                />
            </Figure>
        );
    }
}

export default withIntersectionObserver({
    threshold: 0,
    rootMargin: "500px 0px",
})(ImageLazyLoader);
