const theme = require("./src/theme.js");
const pkg = require("./package.json");

require("dotenv").config();

module.exports = {
    siteMetadata: {
        siteUrl: process.env.GATSBY_APP_URL,
    },
    plugins: [
        {
            resolve: "gatsby-plugin-sentry",
            options: {
                dsn: "https://8b7d1f0f113e4c27b9d8f1618e41816a@sentry.io/1370301",
                environment: process.env.NODE_ENV,
                enabled: (() => ["production", "stage"].indexOf(process.env.NODE_ENV) !== -1)(),
            },
        },
        {
            resolve: "gatsby-plugin-google-analytics",
            options: {
                trackingId: "UA-132392867-1",
                // Puts tracking script in the head instead of the body
                head: false,
                anonymize: true,
                respectDNT: true,
            },
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
                plugins: [],
            },
        },
        {
            resolve: "gatsby-plugin-favicon",
            options: {
                logo: "./src/components/Layout/favicon.png",
                appName() { return this.siteMetadata.title; },
                appDescription: pkg.description,
                developerName: pkg.author.name,
                developerURL: pkg.author.url,
                dir: "auto",
                lang: "nl-BE",
                background: theme.color.body,
                theme_color: theme.color.primary[5],
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
        {
            resolve: "gatsby-plugin-netlify-cms",
            options: {
                /**
               * One convention is to place your Netlify CMS customization code in a
               * `src/cms` directory.
               */
                modulePath: `${__dirname}/src/cms/cms.js`,
            },
        },
        {
            resolve: "gatsby-plugin-stylelint",
            options: { files: ["./src/**/*.js"] },
        },
        "gatsby-plugin-sitemap",
    ],
};
