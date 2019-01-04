import React from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import {
    mb, p, py, px,
} from "styled-components-spacing";
import Image from "../Image";

const List = styled.ul`
    list-style: none;
    ${p(0)}
    ${mb(0)}
    ${py(2)}
    ${px(4)}
`;

const Link = styled(GatsbyLink)`
    display: flex;
    align-items: center;
    text-decoration: none;
    line-height: ${props => props.theme.leading.none};
    color: ${props => props.theme.color.text};
    ${py(2)}
`;

const Title = styled.div`
    font-family: ${props => props.theme.font.family.headings};
    letter-spacing: 0;
    font-weight: ${props => props.theme.font.weight.headings};
    font-size: ${props => props.theme.font.size.lg}rem;
`;

// const Subtitle = styled.div;

const Media = styled.div`
    width: 4.5rem;
    margin-right: 1rem;
    flex-shrink: 0;
`;

const Content = styled.div`
    flex-grow: 1;
`;

export default ({ posts, className }) => (
    <List className={className}>
        {posts && posts.map(({
            node: {
                fields: {
                    slug,
                },
                frontmatter: {
                    title,
                    image,
                },
            },
        }) => (
            <li key={slug}>
                <Link to={slug}>
                    { image && (
                        <Media>
                            <Image
                                publicId={image}
                                aspectRatio="1:1"
                                alt={title}
                            />
                        </Media>
                    )}
                    <Content>
                        <Title>{title.split(" - ")[0]}</Title>
                        { title.split(" - ")[1] && (
                            <div>{title.split(" - ")[1]}</div>
                        )}
                    </Content>
                </Link>
            </li>
        ))}
    </List>
);
