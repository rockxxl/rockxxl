module.exports = {
    plugins: [
        "gatsby-plugin-styled-components",
        "gatsby-plugin-netlify-cms",
        {
            resolve: "gatsby-plugin-stylelint",
            options: { files: ["./src/**/*.js"] },
        },
    ],
};
