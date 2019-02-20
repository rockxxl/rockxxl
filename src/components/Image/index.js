import React, {
    Fragment, useState, useEffect, useRef,
} from "react";
import { useInView } from "react-intersection-observer";
import { Wrapper, StyledImage, Placeholder } from "./styles";
import { getSrcSet } from "./cloudinary";


const getSize = ({ image: { current: image } }) => {
    const { naturalWidth, naturalHeight } = image;
    const { height, width } = image.getBoundingClientRect();
    const imageWidthRatio = naturalWidth / naturalHeight;

    const roundedWidth = Math.max(
        width,
        height * imageWidthRatio,
    );

    const result = `${Number.isNaN(roundedWidth) ? width : roundedWidth}px`;
    return result;
};

const imageLoaded = ({ state, setState }) => setState({ ...state, loaded: true });

const Image = (props) => {
    const {
        alt,
        aspectRatio,
        className,
    } = props;

    const image = useRef();
    const [ref, inView] = useInView({
        threshold: 0,
        rootMargin: "500px 0px",
        triggerOnce: true,
    });

    /* eslint-disable react/destructuring-assignment */
    const [state, setState] = useState({
        loaded: false,
        srcSet: props.srcSet,
        src: props.src,
        sizes: props.sizes || "1px",
    });
    /* eslint-enable react/destructuring-assignment */

    const {
        loaded,
        srcSet,
        src,
        sizes,
    } = state;

    useEffect(() => {
        setState({
            ...state,
            ...getSrcSet({ props }),
            ...inView && sizes === "1px" && image.current && { sizes: getSize({ image }) },
        });
    }, [inView]);

    return (
        <Wrapper
            ref={ref}
            aspectRatio={aspectRatio}
            className={className}
        >
            {inView && (
                <Fragment>
                    <StyledImage
                        ref={image}
                        src={src}
                        srcSet={srcSet}
                        onLoad={() => imageLoaded({ state, setState })}
                        onError={() => imageLoaded({ state, setState })}
                        styled={{
                            fit: aspectRatio,
                            loaded,
                        }}
                        sizes={sizes}
                        alt={alt}
                    />
                    <Placeholder
                        styled={{
                            backgroundImage: src,
                            loaded,
                        }}
                    />
                </Fragment>
            )}
        </Wrapper>
    );
};

export default Image;
