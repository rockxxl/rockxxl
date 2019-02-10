const path = require("path");

module.exports = {
    plugins:["jest"],
    extends: ["plugin:jest/recommended"],
    env: {
        "jest/globals": true
    },
    globals: {
        browser: true,
        by: true,
        element: true,
        // "element.all": true,
        until: true,
    }
};
