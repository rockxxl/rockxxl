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
    const { createPage } = actions;
    const blogPostTemplate = path.resolve("src/templates/post.js");

    return graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `).then(({ errors, data }) => { // eslint-disable-line
        if (errors) return Promise.reject(errors);

        data.allMarkdownRemark.edges.forEach(({
            node: {
                fields: { slug },
            },
        }) => {
            createPage({
                path: slug,
                component: blogPostTemplate,
                context: {},
            });
        });
    });
};

// exports.sourceNodes = ({ actions, getNodes, getNode }) => {
//     const { createNodeField } = actions;
//     console.log(getNodes().filter(node => node.internal.type === "MarkdownRemark"));
//     const postsOfCategories = {};
//     getNodes()
//         .filter(node => node.internal.type === "MarkdownRemark")
//         .forEach((node) => {
//             if (node.frontmatter.category) {
//                 const categoryNode = getNodes().find(
//                     ({ internal, frontmatter }) => internal.type === "MarkdownRemark"
//                         && frontmatter.title === node.frontmatter.category,
//                 );

//                 if (categoryNode) {
//                     const categorySlug = createFilePath({ categoryNode, getNode, basePath: "pages" });
//                     const postSlug = createFilePath({ node, getNode, basePath: "pages" });
//                     createNodeField({
//                         path: path.join(categorySlug, postSlug),
//                         node,
//                         name: "category",
//                         value: categoryNode.id,
//                     });

//                     // if it's first time for this category init empty array for his posts
//                     if (!(categoryNode.id in postsOfCategories)) {
//                         postsOfCategories[categoryNode.id] = [];
//                     }
//                     // add book to this category
//                     postsOfCategories[categoryNode.id].push(node.id);
//                 }
//             }
//         });

//     Object.entries(postsOfCategories).forEach(([categoryNodeId, postIds]) => {
//         const node = getNode(categoryNodeId);
//         const slug = createFilePath({ node, getNode, basePath: "pages" });
//         createNodeField({
//             path: slug,
//             node,
//             name: "post",
//             value: postIds,
//         });
//     });
// };
