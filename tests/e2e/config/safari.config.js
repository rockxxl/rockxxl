require("dotenv").config();
const browsers = require("./browsers");

const defaults = {
    rootDir: "../../../",
    testMatch: ["<rootDir>/tests/e2e/**/*.test.js"],
    testPathIgnorePatterns: ["node_modules", ".cache"],
    transformIgnorePatterns: ["node_modules/(?!(gatsby)/)"],
    testEnvironment: "<rootDir>/tests/e2e/config/WebDriverEnvironment.js",
};

const testEnvironmentOptions = {
    seleniumAddress: "http://hub-cloud.browserstack.com/wd/hub",
};

const capabilities = {
    project: "rockxxl",
    "browserstack.timezone": "Brussels",
    "browserstack.user": process.env.BROWSERSTACK_USER,
    "browserstack.key": process.env.BROWSERSTACK_KEY,
};

const config = {
    rootDir: "../../../",
    projects: browsers.map(browser => ({
        ...defaults,
        testEnvironmentOptions: {
            ...testEnvironmentOptions,
            capabilities: {
                ...capabilities,
                ...browser,
            },
        },
    })),
};

module.exports = config;

// module.exports.defaults = defaults;
// module.exports.testEnvironmentOptions = testEnvironmentOptions;
// module.exports.capabilities = capabilities;
