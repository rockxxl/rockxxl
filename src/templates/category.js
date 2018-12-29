/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Container from "../components/Container";
import PostGrid from "../components/PostGrid";

export default function Template({ data }) {
    const { allMarkdownRemark: { edges } } = data;
    const {
        node: {
            fields: { slug },
            frontmatter: { title },
            html,
        },
    } = edges[0];

    return (
        <Layout>
            <Helmet
                title={title}
                meta={[
                    { property: "og:title", content: title },
                    { property: "og:url", content: `${process.env.GATSBY_APP_URL}${slug}` },
                ]}
            />
            <Container>
                <article>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </article>
                <PostGrid posts={edges} />
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
