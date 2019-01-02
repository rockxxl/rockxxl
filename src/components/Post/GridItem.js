import React, { Fragment } from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import { p, my } from "styled-components-spacing";
import Image from "../Image";

const Link = styled(GatsbyLink)`
    display: block;
    color: ${props => props.theme.color.text};
    font-weight: ${props => props.theme.font.weight.bold};
    letter-spacing: -.66px;
    line-height: ${props => props.theme.leading.none};
    text-decoration: none;
    position: relative;
    flex-grow: 1;

    &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        z-index: 9;
        display: block;
        content: "";
        background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 100%);
    }
`;

const Content = styled.div`
    color: ${props => props.theme.color.body};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    ${p(6)};
`;

const Heading = styled.h1`
    color: ${props => props.theme.color.body};
    font-weight: ${props => props.theme.font.weight.bold};
    font-size: ${({ large, theme }) => (large ? `${theme.font.size.xxxl}rem` : "1rem")};
    ${my(0)}
`;

const Title = ({ title }) => (
    <Fragment>
        <div>{title.split(" - ")[0]}</div>
        { title.split(" - ")[1] && (
            <div>{title.split(" - ")[1]}</div>
        )}
    </Fragment>
);

export default ({
    node: {
        fields: { slug },
        frontmatter: {
            title,
            image,
        },
    },
    aspectRatio,
    className,
    large,
}) => (
    <article className={className}>
        <Link to={slug}>
            { image && (
                <Image
                    publicId={image}
                    aspectRatio={aspectRatio}
                    alt={title}
                />
            )}
            <Content>
                <Heading large={large}>
                    <Title title={title} />
                </Heading>
            </Content>
        </Link>
    </article>
);
