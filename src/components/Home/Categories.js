import React from "react";
import styled from "styled-components";
import { pb } from "styled-components-spacing";
import { StaticQuery, graphql } from "gatsby";
import Category from "./Category";

const Categories = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 1.5rem;
    ${pb(12)}
`;

export default () => (
    <StaticQuery
        query={graphql`
        query CategoriesQuery {
            allMarkdownRemark(
                sort: {order: DESC, fields: [frontmatter___date]}
            ) {
                listOfCategories: distinct(field: frontmatter___category)
                group(
                    field: frontmatter___category,
                    limit: 4
                ) {
                    fieldValue
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
                                image
                                groups
                                album
                            }
                        }
                    }
                }
            }
        }
    `}
        render={data => (
            <Categories>
                { data.allMarkdownRemark.group
                    .filter(({ fieldValue }) => fieldValue !== "undefined")
                    .map(category => (
                        <Category category={category} />
                    ))}
            </Categories>
        )}
    />
);
