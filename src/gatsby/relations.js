module.exports = ({ actions, getNodes, getNode }) => {
    const { createNodeField } = actions;

    const postsOfCategories = {};
    const categoriesOfPosts = {}; // reverse index

    // as we can have multiple categories in post we should handle both cases
    // both when category is specified as single item and when there is list of categories
    // abstracting it to helper function help prevent code duplication
    const getCategoryNodeByName = title => getNodes().find(
        node2 => node2.internal.type === "MarkdownRemark"
        && node2.frontmatter.title.toLowerCase() === title.toLowerCase(),
    );

    getNodes()
        .filter(node => node.internal.type === "MarkdownRemark")
        .forEach((node) => {
            if (node.frontmatter.category) {
                const categoryNodes = node.frontmatter.category instanceof Array
                    ? node.frontmatter.category.map(getCategoryNodeByName) // get array of nodes
                    : [getCategoryNodeByName(node.frontmatter.category)]; // get single node and create 1 element array

                // filtered not defined nodes and iterate through defined categories nodes to add data to indexes
                categoryNodes.filter(categoryNode => categoryNode).forEach((categoryNode) => {
                    // if it's first time for this category init empty array for his posts
                    if (!(categoryNode.id in postsOfCategories)) {
                        postsOfCategories[categoryNode.id] = [];
                    }
                    // add post to this category
                    postsOfCategories[categoryNode.id].push(node.id);

                    // if it's first time for this post init empty array for its categories
                    if (!(node.id in categoriesOfPosts)) {
                        categoriesOfPosts[node.id] = [];
                    }
                    // add category to this post
                    categoriesOfPosts[node.id].push(categoryNode.id);
                });
            }
        });

    Object.entries(postsOfCategories).forEach(([categoryNodeId, postIds]) => {
        createNodeField({
            node: getNode(categoryNodeId),
            name: "posts",
            value: postIds,
        });
    });

    Object.entries(categoriesOfPosts).forEach(([postNodeId, categoryIds]) => {
        createNodeField({
            node: getNode(postNodeId),
            name: "categories",
            value: categoryIds,
        });
    });
};
