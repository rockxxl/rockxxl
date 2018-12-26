const theme = require("./src/theme.js");
const pkg = require("./package.json");

require("dotenv").config();

module.exports = {
    siteMetadata: {
        title: "Rock XXL",
        cldnryCloudName: process.env.CLOUDINARY_CLOUD_NAME,
        cldnryApiKey: process.env.CLOUDINARY_API_KEY,
    },
    plugins: [
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
                plugins: [],
            },
        },
        {
            resolve: "gatsby-plugin-favicon",
            options: {
                logo: "./src/components/Layout/favicon.png",
                appName: pkg.name,
                appDescription: pkg.description,
                developerName: pkg.author.name,
                developerURL: pkg.author.url,
                dir: "auto",
                lang: "nl-BE",
                background: theme.color.body,
                theme_color: theme.color.primary,
                display: "standalone",
                orientation: "any",
                start_url: "",
                version: pkg.version,

                icons: {
                    android: true,
                    appleIcon: true,
                    appleStartup: true,
                    coast: false,
                    favicons: true,
                    firefox: true,
                    opengraph: false,
                    twitter: false,
                    yandex: false,
                    windows: false,
                },
            },
        },
        "gatsby-plugin-eslint",
        "gatsby-plugin-extract-schema",
        "gatsby-plugin-styled-components",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-netlify",
        "gatsby-plugin-netlify-cms",
        {
            resolve: "gatsby-plugin-stylelint",
            options: { files: ["./src/**/*.js"] },
        },
    ],
    mapping: {
        "MarkdownRemark.fields.categories": "MarkdownRemark",
        "MarkdownRemark.fields.posts": "MarkdownRemark",
    },
};
