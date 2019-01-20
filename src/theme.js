const openColor = require("open-color/open-color.json");

const color = {
    white: "#FFFFFF",
    gray: openColor.gray, // Object.assign({}, ...openColor.gray.map((clr, index) => ({ [index * 100]: clr }))),
    get text() { return this.gray[8]; },
    get headings() { return this.gray[9]; },
    get body() { return this.white; },
    primary: {
        9: "#400000",
        8: "#660000",
        7: "#710000",
        6: "#9F3325",
        5: "#B70C01",
        4: "#DF3D21",
        3: "#FF613E",
        2: "#FF845D",
        1: "#FFDDC6",
    },
};

const font = {
    import: "https://fonts.googleapis.com/css?family=Karla:400,400i,700|Montserrat:900",
    family: {
        default: "Karla, sans-serif",
        headings: "Montserrat, sans-serif",
    },
    size: {
        default: 18,
        xs: 0.667,
        sm: 0.816,
        md: 1,
        lg: 1.225,
        xl: 1.5,
        xxl: 1.837,
        xxxl: 2.25,
        xxxxl: 2.756,
        xxxxxl: 3.375,
    },
    weight: {
        default: 400,
        bold: 700,
        headings: 900,
    },
};

const leading = {
    none: 1,
    tight: 1.25,
    normal: 1.5,
    loose: 1.75,
};

const breakpoints = {
    xs: 480,
    sm: 720,
    md: 960,
    lg: 1200,
    xl: 1440,
    xxl: 1680,
    get notMobile() { return this.md; },
};

const spacing = Array.from(Array(40).keys()).reduce((o, key) => ({
    ...o, [key - 20]: (key - 20) === 0 ? 0 : `${0.25 * (key - 20)}rem`,
}), { auto: "auto" });

const button = {
    weight: font.weight.bold,
    border: 0,
    variant: {
        default: {
            color: color.text,
            background: color.gray[3],
            hover: {
                color: color.text,
                background: color.gray[5],
            },
            reset: {
                color: color.text,
                background: "transparent",
                hover: {
                    color: color.primary[5],
                    background: "transparent",
                },
            },
        },
        primary: {
            color: color.white,
            background: color.primary[5],
            hover: {
                color: "inherit",
                background: color.primary[3],
            },
            reset: {
                color: color.primary[5],
                background: "transparent",
                hover: {
                    color: color.primary[3],
                    background: "transparent",
                },
            },
        },
        dark: {
            color: color.white,
            background: color.gray[9],
            hover: {
                color: "inherit",
                background: color.primary[7],
            },
        },
        white: {
            color: color.text,
            background: color.white,
            hover: {
                color: color.text,
                background: color.gray[5],
            },
            reset: {
                color: color.white,
                background: "transparent",
                hover: {
                    color: color.primary[5],
                    background: "transparent",
                },
            },
        },
    },
    disabled: {
        opacity: 0.66,
    },
};

module.exports = {
    color,
    font,
    leading,
    breakpoints,
    spacing,
    button,
};
