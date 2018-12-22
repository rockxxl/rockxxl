module.exports = {
    plugins: [
        "gatsby-plugin-eslint",
        "gatsby-plugin-extract-schema",
        "gatsby-plugin-styled-components",
        "gatsby-plugin-netlify-cms",
        {
            resolve: "gatsby-plugin-stylelint",
            options: { files: ["./src/**/*.js"] },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/pages/post`,
                name: "post",
            },
        },
        {
            resolve: "gatsby-source-filesystem",
            options: {
                path: `${__dirname}/src/pages/category`,
                name: "category",
            },
        },
        {
            resolve: "gatsby-transformer-remark",
            options: {
                plugins: [], // just in case those previously mentioned remark plugins sound cool :)
            },
        },
    ],
    mapping: {
        "MarkdownRemark.frontmatter.category": "MarkdownRemark.frontmatter.title",
    },
};
