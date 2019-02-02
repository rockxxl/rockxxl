import React, { Fragment } from "react";
import { Link as GatsbyLink } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-analytics";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { p, my } from "styled-components-spacing";
import Image from "../Image";

const Link = ({
    to, outbound, title, children, className,
}) => {
    if (outbound) {
        return (
            <OutboundLink
                className={className}
                href={to}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
            >
                {children}
            </OutboundLink>
        );
    }
    return (
        <GatsbyLink
            className={className}
            to={to}
        >
            {children}
        </GatsbyLink>
    );
};

const StyledLink = styled(Link)`
    display: block;
    color: ${props => props.theme.color.text};
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
    font-size: 1rem;
    ${my(0)}
    ${breakpoint("sm")`
        font-size: ${({ large, theme }) => (large ? `${theme.font.size.xxxl}rem` : "1rem")};
    `}
`;

const Title = ({ title }) => {
    if (!title) return null;
    return (
        <Fragment>
            <div>{title.split(" - ")[0]}</div>
            { title.split(" - ")[1] && (
                <div>{title.split(" - ")[1]}</div>
            )}
        </Fragment>
    );
};

export default ({
    node: {
        fields: { slug },
        frontmatter: {
            title,
            thumbnail,
            externalUrl,
        },
    },
    aspectRatio,
    className,
    large,
}) => (
    <article className={className}>
        <StyledLink
            to={externalUrl || slug}
            outbound={externalUrl}
            title={title}
        >
            <Image
                src={thumbnail}
                aspectRatio={aspectRatio}
                alt={title}
            />
            <Content>
                <Heading large={large}>
                    <Title title={title} />
                </Heading>
            </Content>
        </StyledLink>
    </article>
);
