/* eslint-disable react/no-danger */
import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/Layout";
import Container from "../components/Container";

export default function Template({
    data,
}) {
    const { markdownRemark } = data;
    const {
        frontmatter: {
            title,
        }, html,
    } = markdownRemark;
    return (
        <Layout>
            <Container>
                <article>
                    <h1>{title}</h1>
                    <div dangerouslySetInnerHTML={{ __html: html }} />
                </article>
            </Container>
        </Layout>
    );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
