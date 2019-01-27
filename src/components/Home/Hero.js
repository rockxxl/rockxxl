import React from "react";
import { StaticQuery, graphql } from "gatsby";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { py } from "styled-components-spacing";
import GridItem from "../Post/GridItem";

const Grid = styled.div`
    display: grid;
    grid-gap: .5rem;
    grid-template-columns: 1fr;
    ${py(6)}
    ${breakpoint("sm")`
        grid-template-columns: 1fr 1fr;
    `}
    ${breakpoint("md")`
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-row: 1fr 1fr;
    `}
`;

const Post = styled(GridItem)`
    display: flex;
    flex-direction: column;
    grid-column: 1;
    ${breakpoint("sm", "md")`
        grid-column: 1 / 2;
        &:nth-child(2n + 1) { grid-column: 2 / 2; }
        &:nth-child(1) { grid-column: 1 / span 2; }
    `}

    ${breakpoint("md")`
        grid-row: 1 / 2;
        grid-column: 3 / 3;
        &:nth-child(1) {
            grid-column: 1 / span 2;
            grid-row: 1 / span 2;
        }
        &:nth-child(3) {
            grid-row: 2 / 2;
        }
    `}
`;


export default () => (
    <StaticQuery
        query={graphql`
        query HeroQuery {
            allMarkdownRemark(
                filter: {
                    fields: { slug: { ne: null } }
                    frontmatter: {category: { ne: null }}
                }
                sort: {order: DESC, fields: [frontmatter___date]}
                limit: 3
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                            category
                            author
                            permalink
                            band
                            date
                            eventDate
                            thumbnail
                            groups
                            album
                            externalUrl
                        }
                    }
                }
            }
        }
    `}
        render={data => (
            <Grid>
                { data.allMarkdownRemark.edges.map((post, index) => (
                    <Post
                        index={index}
                        large={index === 0}
                        key={post.node.fields.slug}
                        aspectRatio="16:9"
                        {...post}
                    />
                ))}
            </Grid>
        )}
    />
);
