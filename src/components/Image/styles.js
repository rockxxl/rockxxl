import styled from "styled-components";

export const StyledImage = styled.img`
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

export const Wrapper = styled.div.attrs(
    ({ aspectRatio }) => aspectRatio && {
        style: {
            paddingBottom: `${aspectRatio.split(":")[1] / aspectRatio.split(":")[0] * 100}%`,
        },
    },
)`
    width: 100%;
    position: relative;
    overflow: hidden;
    background-color: ${props => props.theme.color.gray[3]};
`;

export const Placeholder = styled.div.attrs(
    ({ styled: { backgroundImage } }) => ({
        style: {
            backgroundImage: `url(${backgroundImage})`,
        },
    }),
)`
    background-size: cover;
    content: "";
    display: block;
    filter: blur(25px);
    height: 100%;
    left: 0;
    object-fit: cover;
    overflow: hidden;
    position: absolute;
    top: 0;
    transform-origin: 50% 50%;
    transform: scale(2);
    width: 100%;
    z-index: 1;
`;
