import React from "react";
import { Link as GatsbyLink } from "gatsby";
import styled from "styled-components";
import { p } from "styled-components-spacing";
import Image from "./Image";

const List = styled.ul`
    display: grid;
    padding: 0;
    list-style: reset;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-gap: 1.5rem;
`;

const Post = styled.li`
    display: block;
`;

const Link = styled(GatsbyLink)`
    display: block;
    color: ${props => props.theme.color.text};
    font-weight: ${props => props.theme.font.weight.bold};
    letter-spacing: -.66px;
    line-height: ${props => props.theme.leading.none};
    text-decoration: none;
    position: relative;

    &:after {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        z-index: 1;
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
    z-index: 2;
    ${p(6)};
`;

export default ({ posts, aspectRatio }) => (
    <List>
        {posts && posts.map(({
            node: {
                fields: { slug },
                frontmatter: {
                    title,
                    image,
                },
            },
        }) => (
            <Post key={slug}>
                <Link to={slug}>
                    { image ? (
                        <Image
                            publicId={image}
                            aspectRatio={aspectRatio}
                        />
                    ) : null }
                    <Content>
                        { title }
                    </Content>
                </Link>
            </Post>
        ))}
    </List>
);
