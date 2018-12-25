const path = require("path");
const slugify = require("slugify");
const { createFilePath } = require("gatsby-source-filesystem");
const { templates, relations } = require("./src/gatsby/index");

exports.onCreateNode = ({
    node, getNode, actions,
}) => {
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

exports.createPages = ({ actions, graphql }) => templates({ actions, graphql });

exports.sourceNodes = ({ actions, getNodes, getNode }) => relations({ actions, getNodes, getNode });
