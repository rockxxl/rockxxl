import React from "react";
import styled from "styled-components";
import Post from "./GridItem";

const List = styled.ul`
    display: grid;
    padding: 0;
    list-style: none;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
    grid-gap: 1.5rem;
`;

const aspectRatio = (category) => {
    switch (category.toLowerCase()) {
    case "interviews":
        return "4:3";
    case "live reviews":
        return "210:297";
    default:
        return "1:1";
    }
};

export default ({ posts }) => posts && (
    <List>
        {posts.map(post => (
            post.node.frontmatter.category && (
                <Post
                    key={post.node.fields.slug}
                    {...post}
                    aspectRatio={aspectRatio(post.node.frontmatter.category)}
                />
            )
        ))}
    </List>
);
