import React from "react";
import styled from "styled-components";
import { StaticQuery, graphql, Link as GatsbyLink } from "gatsby";

const Navigation = styled.nav`
    display: flex;
`;

const Link = styled(GatsbyLink)`
    display: block;
    padding: 0 .75rem;
    color: #ffffff;
    text-decoration: none;
    font-weight: ${props => props.theme.font.weight.bold};

    &:hover,
    &:focus,
    &.active,
    &[data-active] {
        color: ${props => props.theme.color.primary[5]};
    }
`;

const isPartiallyActive = ({
    isPartiallyCurrent,
}) => ({ "data-active": isPartiallyCurrent || null });


export default ({ className }) => (
    <StaticQuery
        query={graphql`
        query NavgiationQuery {
            allMarkdownRemark(
                filter: {
                    fields: { slug: { ne: null } }
                    fileAbsolutePath: { regex: "src/pages/category/" }
                }
                sort: { order: ASC, fields: [frontmatter___title] }
            ) {
                edges {
                    node {
                        fields {
                            slug
                        }
                        frontmatter {
                            title
                        }
                    }
                }
            }
        }
    `}
        render={data => (
            <Navigation className={className}>
                { data.allMarkdownRemark.edges.map(({
                    node: { fields: { slug }, frontmatter: { title } },
                }) => (
                    <Link
                        key={title}
                        to={slug}
                        activeClassName="active"
                        getProps={isPartiallyActive}
                    >
                        { title }
                    </Link>
                )) }
            </Navigation>
        )}
    />
);
