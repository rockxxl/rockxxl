/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Grid from "../components/Post/Grid";

export default function Template({ data }) {
    const { allMarkdownRemark: { group, listOfCategories } } = data;
    const posts = group.find(({ fieldValue }) => fieldValue === listOfCategories[0]).edges;
    const category = group.find(({ fieldValue, totalCount }) => fieldValue === "undefined" && totalCount === 1).edges[0];
    const {
        node: {
            fields: { slug },
            frontmatter: { title },
            html,
        },
    } = category;

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
                <Grid posts={posts} />
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
            totalCount
            listOfCategories: distinct(field: frontmatter___category)
            group(field: frontmatter___category) {
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
    }
`;
