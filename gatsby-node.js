const path = require("path");
const slugify = require("slugify");

const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
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

exports.createPages = ({ actions, graphql }) => {
    const { createPage, createRedirect } = actions;
    const postTemplate = path.resolve("src/templates/post.js");
    const categoryTemplate = path.resolve("src/templates/category.js");

    return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
            node {
              fileAbsolutePath
              fields {
                slug
              }
              frontmatter {
                title
                author
                permalink
                band
                date
                image
                groups
                album
                category {
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
      }
    }
  `).then(({ errors, data }) => { // eslint-disable-line
        if (errors) return Promise.reject(errors);

        data.allMarkdownRemark.edges.forEach(({ node }) => {
            const template = node.fileAbsolutePath.includes("/src/pages/post/")
                ? postTemplate
                : categoryTemplate;

            createPage({
                path: node.fields.slug,
                component: template,
                context: {},
            });

            if (node.frontmatter.permalink) {
                createRedirect({
                    fromPath: node.frontmatter.permalink,
                    toPath: node.fields.slug,
                    isPermanent: true,
                });
            }
        });
    });
};
