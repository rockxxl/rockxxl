import React from "react";
import { StaticQuery, graphql } from "gatsby";

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
            <div>
                <pre>{JSON.stringify(data, null, 2) }</pre>
                {/* { data.allMarkdownRemark.edges.map(({
                    node: { fields: { slug }, frontmatter: { title } },
                }) => (
                    <Link
                        key={title}
                        to={slug}
                        activeClassName="active"
                    >
                        { title }
                    </Link>
                )) } */}
            </div>
        )}
    />
);
