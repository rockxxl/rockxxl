// require("dotenv").config();
// const browserslist = require("browserslist");
// const axios = require("axios");

// const supportedBrowsers = browserslist();
// const aliases = {
//     fx: "firefox",
//     ff: "firefox",
//     ios: "ios_saf",
//     explorer: "ie",
//     blackberry: "bb",
//     explorermobile: "ie_mob",
//     operamini: "op_mini",
//     operamobile: "op_mob",
//     chromeandroid: "and_chr",
//     firefoxandroid: "and_ff",
//     ucandroid: "and_uc",
//     qqandroid: "and_qq",
// };

// const cleanedSupportedBrowsers = supportedBrowsers.map((browser) => {

// });

// const getBrowserStackBrowsers = async () => {
//     const res = await axios.get(
//         "https://api.browserstack.com/5/browsers",
//         {
//             params: {
//                 flat: true,
//             },
//             auth: {
//                 username: process.env.BROWSERSTACK_USER,
//                 password: process.env.BROWSERSTACK_KEY,
//             },
//         },
//     );
// };

// const browserStackBrowsers = getBrowserStackBrowsers();
// console.log("test");
// module.exports = browsers;

module.exports = [
    {
        os_version: "12",
        device: "iPhone XS",
        real_mobile: "true",
    },
    {
        os_version: "11",
        device: "iPhone 6S",
        real_mobile: "true",
    },
    {
        os_version: "9.0",
        device: "Google Pixel 3 XL",
        real_mobile: "true",
    },
    {
        os_version: "8.0",
        device: "Google Pixel 2",
        real_mobile: "true",
    },
    {
        os: "Windows",
        os_version: "10",
        browserName: "Chrome",
        browser_version: "72.0",
        "browserstack.local": "false",
        "browserstack.selenium_version": "3.5.2",
    },
    {
        os: "Windows",
        os_version: "10",
        browserName: "IE",
        browser_version: "11.0",
        "browserstack.local": "false",
        "browserstack.selenium_version": "3.5.2",
    },
    {
        os: "Windows",
        os_version: "10",
        browserName: "Edge",
        browser_version: "18.0",
        "browserstack.local": "false",
        "browserstack.selenium_version": "3.5.2",
    },
    {
        os: "Windows",
        os_version: "10",
        browserName: "Firefox",
        browser_version: "65.0",
        "browserstack.local": "false",
    },
    {
        os: "OS X",
        os_version: "Mojave",
        browserName: "Safari",
        browser_version: "12.0",
        "browserstack.local": "false",
        "browserstack.selenium_version": "3.5.2",
    },
    {
        os: "OS X",
        os_version: "Mojave",
        browserName: "Chrome",
        browser_version: "72.0",
        "browserstack.local": "false",
        "browserstack.selenium_version": "3.5.2",
    },
    {
        os: "OS X",
        os_version: "Mojave",
        browserName: "Firefox",
        browser_version: "65.0",
        "browserstack.local": "false",
    },
];
