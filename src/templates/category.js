/* eslint-disable react/no-danger */
import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Container from "../components/Container";

export default function Template({ data }) {
    const { markdownRemark } = data;
    const {
        frontmatter: { title },
        fields: { posts },
        html,
    } = markdownRemark;
    return (
        <Layout>
            <Container>
                <article>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </article>
                <ul>
                    {posts ? posts.map(({
                        fields: { slug },
                        frontmatter: { title: postTitle },
                    }) => (
                        <li key={postTitle}>
                            <Link to={slug}>{ postTitle }</Link>
                        </li>
                    )) : null}
                </ul>

            </Container>
        </Layout>
    );
}

export const pageQuery = graphql`
    query($path: String!) {
        markdownRemark(fields: { slug: { eq: $path } }) {
            fileAbsolutePath
            html
            fields {
                slug
                posts {
                    html
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                    }
                }
            }
            frontmatter {
                title
            }
        }
    }
`;
