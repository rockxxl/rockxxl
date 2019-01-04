import React from "react";
import { Link as GatsbyLink } from "gatsby";
import { py, px } from "styled-components-spacing";
import styled from "styled-components";
import slugify from "slugify";
import PostList from "../Post/List";
import FirstPost from "../Post/GridItem";

const ToFullList = styled(GatsbyLink)`
    display: block;
    font-size: ${props => props.theme.font.size.sm}rem;
`;

const Heading = styled.h2`
    font-size: ${props => props.theme.font.size.xl}rem;
`;

const HeadingLink = styled(GatsbyLink)`
    color: ${props => props.theme.color.headings};
    text-decoration: none;
`;

const List = styled(PostList)`
    ${py(3)}
    ${px(0)}
`;

export default ({ category: { fieldValue: title, edges: posts } }) => {
    const slug = slugify(title, { lower: true });
    return (
        <section>
            <Heading>
                <HeadingLink to={slug}>
                    {title}
                </HeadingLink>
            </Heading>
            <FirstPost
                key={posts[0].node.fields.slug}
                aspectRatio="16:9"
                {...posts[0]}
            />
            <List posts={posts.slice(1)} />
            <ToFullList to={slug}>
                {`Alle ${title.toLowerCase()}`}
            </ToFullList>
        </section>
    );
};
