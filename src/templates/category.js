/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Container from "../components/Container";
import PostGrid from "../components/PostGrid";

export default function Template({ data }) {
    const { allMarkdownRemark: { edges } } = data;
    const {
        node: {
            frontmatter: { title },
            html,
        },
    } = edges.filter(({ node }) => !node.frontmatter.category)[0];

    const posts = edges.filter(({ node }) => node.frontmatter.category === title);

    const aspectRatio = () => {
        switch (title.toLowerCase()) {
        case "interviews":
            return "4:3";
        case "live reviews":
            return "210:297";
        default:
            return "1:1";
        }
    };

    return (
        <Layout>
            <Container>
                <article>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </article>
                <PostGrid
                    posts={posts}
                    aspectRatio={aspectRatio()}
                />
            </Container>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
        allMarkdownRemark(
            filter: { fields: { slug: { regex: $path } } }
            sort: { order: DESC, fields: [frontmatter___date] }
        ) {
            edges {
                node {
                    fileAbsolutePath
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
`;
