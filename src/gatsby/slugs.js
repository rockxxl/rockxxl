const path = require("path");
const slugify = require("slugify");
const isAfter = require("date-fns/is_after");
const { createFilePath } = require("gatsby-source-filesystem");

module.exports = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === "MarkdownRemark") {
        const { category } = node.frontmatter;

        if (category) {
            // Post
            let slug = null;

            // Does the post have a publication date after today/now?
            if (isAfter(new Date(), new Date(node.frontmatter.date))) {
                const { title } = node.frontmatter;
                const slugifyConfig = { lower: true };
                slug = path.join("/", slugify(category, slugifyConfig), slugify(title, slugifyConfig));
            }

            createNodeField({
                node,
                name: "slug",
                value: slug,
            });
        } else {
            // Other type
            createNodeField({
                node,
                name: "slug",
                value: createFilePath({ node, getNode, basePath: "pages" }),
            });
        }
    }
};
