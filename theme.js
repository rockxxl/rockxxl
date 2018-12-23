// Define what props.theme will look like
module.exports = {
    color: {
        text: "#000000",
        body: "#ffffff",
        light: "#666666",
        primary: "#B70C01",
    },
    font: {
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

        },
        weight: {
            default: 400,
            bold: 700,
            headings: 900,
        },
    },
    breakpoints: {
        xs: 480,
        sm: 720,
        md: 960,
        lg: 1200,
        xl: 1440,
        xxl: 1680,
    },
    spacing: Array.from(Array(20).keys()).reduce((o, key) => ({
        ...o, [key]: key === 0 ? 0 : `${0.25 * key}rem`,
    }), {}),
};
