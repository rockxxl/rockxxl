const path = require("path");

module.exports = ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;
    const postTemplate = path.resolve("src/templates/post.js");
    const categoryTemplate = path.resolve("src/templates/category.js");

    return graphql(`
    {
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
                        slugLegacy
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
                        externalUrl
                    }
                }
            }
        }
    }
  `).then(({ errors, data }) => { // eslint-disable-line
        if (errors) return Promise.reject(errors);

        data.allMarkdownRemark.edges.forEach(({ node }) => {
            const template = node.fileAbsolutePath.includes("/src/pages/post/")
                ? postTemplate
                : categoryTemplate;

            if (node.fields.slug) {
                createPage({
                    path: node.fields.slug,
                    component: template,
                    context: {},
                });

                // Make Netlify handle the external URL redirect
                if (node.frontmatter.externalUrl) {
                    createRedirect({
                        fromPath: node.fields.slug,
                        toPath: node.frontmatter.externalUrl,
                        isPermanent: true,
                    });
                }

                // Redirect legacy slugs
                if (node.fields.slugLegacy) {
                    createRedirect({
                        fromPath: node.fields.slugLegacy,
                        toPath: node.fields.slug,
                        isPermanent: true,
                    });
                }

                // Redirect the legacy Wordpress URL to the new URL's
                if (node.frontmatter.permalink) {
                    createRedirect({
                        fromPath: node.frontmatter.permalink,
                        toPath: node.fields.slug,
                        isPermanent: true,
                    });
                }
            }
        });
    });
};
