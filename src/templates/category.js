/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import Container from "../components/Container";
import Grid from "../components/Post/Grid";
import Layout from "../components/Layout";
import SEO from "../components/SEO";

export default function Template({ data }) {
    const { allMarkdownRemark: { group, listOfCategories } } = data;
    const posts = group.find(({ fieldValue }) => fieldValue === listOfCategories[0]).edges;
    const category = group.find(({ fieldValue, totalCount }) => fieldValue === "undefined" && totalCount === 1).edges[0];
    const {
        node: {
            fields: { slug },
            frontmatter: { title, date },
            html,
        },
    } = category;

    return (
        <Layout>
            <SEO
                title={title}
                slug={slug}
                date={date}
            />
            <Container>
                <article>
                    <header>
                        <h1>{title}</h1>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </header>
                    <section>
                        <Grid posts={posts} />
                    </section>
                </article>
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
    }
`;
