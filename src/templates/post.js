/* eslint-disable react/no-danger */

import React from "react";
import { graphql } from "gatsby";
import Grid from "styled-components-grid";
import styled from "styled-components";
import { p, mb, mr } from "styled-components-spacing";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout";
import Image from "../components/Image";

const Wrapper = styled(Grid)`
    display: flex;
    flex-grow: 1;
    max-width: 1440px;
    width: 100%;
`;

const Sidebar = styled(Grid.Unit)`
    border-left: 1px solid ${props => props.theme.color.extremelyLight};
    ${p(6)};
`;

const Content = styled(Grid.Unit)`
    display: flex;
    flex-direction: column;
    align-items: center;
    ${p(6)};
`;

const Article = styled.article`
    width: 100%;
    max-width: 640px;
    line-height: ${props => props.theme.leading.loose};
`;

const Media = styled.div`
    width: 50%;
    float: left;
    margin-left: -25%;
    ${mb(3)};
    ${mr(6)};
`;

export default function Template({
    data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data; // data.markdownRemark holds our post data
    const {
        frontmatter: {
            title,
            image,
        }, html,
    } = markdownRemark;
    return (
        <Layout>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Wrapper>
                <Content size={{ md: 3 / 4 }}>
                    <Article>
                        <h1>{title}</h1>
                        <Media>
                            <Image publicId={image} />
                        </Media>
                        <div dangerouslySetInnerHTML={{ __html: html }} />
                    </Article>
                </Content>

                <Sidebar size={{ md: 1 / 4 }}>
                    <aside>
                        sidebar
                    </aside>
                </Sidebar>
            </Wrapper>
        </Layout>
    );
}

export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        title
        image
      }
    }
  }
`;
