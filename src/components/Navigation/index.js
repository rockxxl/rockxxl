import React from "react";
import styled from "styled-components";
import breakpoint from "styled-components-breakpoint";
import { py, px } from "styled-components-spacing";
import { StaticQuery, graphql, Link as GatsbyLink } from "gatsby";

const List = styled.nav`
    display: flex;
`;

const Link = styled(GatsbyLink)`
    display: block;
    padding: 0 .75rem;
    color: #ffffff;
    text-decoration: none;
    text-align: center;
    font-weight: ${props => props.theme.font.weight.bold};
    ${py(3)}
    ${px(4)}
    ${({ theme, offCanvasMenu }) => offCanvasMenu && `
        font-size: ${theme.font.size.xxxl}rem;
        font-family: ${theme.font.family.headings};
        font-weight: ${theme.font.weight.headings};
        line-height: ${theme.leading.none};
        letter-spacing: 0;
    `};
    ${breakpoint("sm")`
        ${({ theme, offCanvasMenu }) => offCanvasMenu && `
            font-size: ${theme.font.size.xxxxl}rem;
        `};
    `}

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


const Navigation = ({ className, offCanvasMenu }) => (
    <StaticQuery
        query={graphql`
        query NavgiationQuery {
            allMarkdownRemark(
                filter: {
                    fields: { slug: { ne: null } }
                    fileAbsolutePath: { regex: "src/pages/category/" }
                }
                sort: {
                    order: ASC,
                    fields: [frontmatter___title]
                }
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
            <List className={className}>
                { data.allMarkdownRemark.edges.map(({
                    node: { fields: { slug }, frontmatter: { title } },
                }) => (
                    <Link
                        key={title}
                        to={slug}
                        activeClassName="active"
                        getProps={isPartiallyActive}
                        offCanvasMenu={offCanvasMenu}
                    >
                        { title }
                    </Link>
                )) }
            </List>
        )}
    />
);

Navigation.defaultProps = {
    offCanvasMenu: false,
};

export default Navigation;
