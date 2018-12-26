const path = require("path");
const slugify = require("slugify");
const { createFilePath } = require("gatsby-source-filesystem");

module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;

    if (node.internal.type === "MarkdownRemark") {
        const { category } = node.frontmatter;
        let slug = createFilePath({ node, getNode, basePath: "pages" });
        slug = category ? path.join("/", slugify(category, { lower: true }), slug) : slug;

        createNodeField({
            node,
            name: "slug",
            value: slug,
        });
    }
};
