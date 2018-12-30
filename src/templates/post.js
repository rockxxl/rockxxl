/* eslint-disable react/no-danger */

import React from "react";
import { graphql } from "gatsby";
import Post from "../components/Post/Detail";
import Sidebar from "../components/Post/Sidebar";

export default function Template({
    data: { markdownRemark: post, allMarkdownRemark },
}) {
    const related = allMarkdownRemark.group.find(({ fieldValue }) => fieldValue === post.frontmatter.category).edges;
    const category = allMarkdownRemark.group.find(({ fieldValue }) => fieldValue === "undefined").edges[0];
    return (
        <Post
            post={post}
            sidebar={(
                <Sidebar
                    posts={related}
                    category={category}
                />
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
            image
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
                        image
                        groups
                        album
                    }
                }
            }
        }
    }
}`;
