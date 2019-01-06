/* eslint-disable react/no-danger */

import React, { Fragment } from "react";
import styled from "styled-components";
import { px, py } from "styled-components-spacing";
import { graphql, Link as GatsbyLink } from "gatsby";
import Post from "../components/Post/Detail";
import List from "../components/Post/List";

const ToFullList = styled(GatsbyLink)`
    display: block;
    font-size: ${props => props.theme.font.size.sm}rem;
    border-top: 1px solid ${props => props.theme.color.extremelyLight};
    ${py(3)}
    ${px(4)}
`;

export default function Template({
    data: { markdownRemark: post, allMarkdownRemark },
}) {
    const related = allMarkdownRemark
        .group
        .find(({ fieldValue }) => fieldValue === post.frontmatter.category).edges;

    const category = allMarkdownRemark
        .group
        .find(({ fieldValue }) => fieldValue === "undefined")
        .edges
        .find(({ node }) => node.frontmatter.title === post.frontmatter.category);

    return (
        <Post
            post={post}
            sidebar={(
                <Fragment>
                    <List
                        posts={related}
                        category={category}
                    />
                    <ToFullList to={category.node.fields.slug}>
                        Terug naar
                        {" "}
                        {category.node.frontmatter.title}
                    </ToFullList>
                </Fragment>
            )}
        />
    );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: {slug: {eq: $path}}) {
        html
        fields {
            slug
        }
        frontmatter {
            title
            category
            thumbnail
            author
            date
        }
    }
    allMarkdownRemark(
        filter: {fields: {slug: {ne: $path}}}
        sort: {order: DESC, fields: [frontmatter___date]}
    ) {
        totalCount
        listOfCategories: distinct(field: frontmatter___category)
        group(
            field: frontmatter___category,
            limit: 5
        ) {
            fieldValue
            totalCount
            edges {
                node {
                    html
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
                        thumbnail
                        groups
                        album
                    }
                }
            }
        }
    }
}`;
