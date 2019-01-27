import React from "react";
import styled from "styled-components";
import { pb } from "styled-components-spacing";
import breakpoint from "styled-components-breakpoint";
import { StaticQuery, graphql } from "gatsby";
import Category from "./Category";

const Categories = styled.div`
    display: grid;
    grid-gap: 1.5rem;
    ${pb(12)}
    grid-template-columns: 1fr;
    ${breakpoint("sm")` grid-template-columns: 1fr 1fr; `}
    ${breakpoint("md")` grid-template-columns: 1fr 1fr 1fr; `}
    ${breakpoint("lg")` grid-template-columns: 1fr 1fr 1fr 1fr 1fr; `}
`;

export default () => (
    <StaticQuery
        query={graphql`
        query CategoriesQuery {
            allMarkdownRemark(
                filter: { fields: { slug: { ne: null } } }
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
    `}
        render={data => (
            <Categories>
                { data.allMarkdownRemark.group
                    .filter(({ fieldValue }) => fieldValue !== "undefined")
                    .map(category => (
                        <Category
                            key={category.fieldValue}
                            category={category}
                        />
                    ))}
            </Categories>
        )}
    />
);
