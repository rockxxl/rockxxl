const { templates, relations, slugs } = require("./src/gatsby/index");

exports.onCreateNode = ({ node, getNode, actions }) => slugs({ node, getNode, actions });
exports.createPages = ({ actions, graphql }) => templates({ actions, graphql });
exports.sourceNodes = ({ actions, getNodes, getNode }) => relations({ actions, getNodes, getNode });
