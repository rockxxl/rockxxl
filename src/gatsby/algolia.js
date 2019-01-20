const base64 = require("base-64");
const striptags = require("striptags");

const searchIndexQuery = `{
    allMarkdownRemark(
        filter: { fields: { slug: { ne: null } } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
    ) {
        edges {
            node {
                fileAbsolutePath
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
}`;

module.exports = [
    {
        query: searchIndexQuery,
        transformer: ({ data }) => data.allMarkdownRemark.edges.map(({ node }) => ({
            ...node.frontmatter,
            ...node.fields,
            objectID: base64.encode(node.fields.slug),
            html: striptags(node.html).substring(0, 5000),
        })),
    },
];
