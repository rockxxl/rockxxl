module.exports = {
    root: true,
    parserOptions: {
        parser: "babel-eslint"
    },
    extends: ["airbnb"],
    rules: {
        "max-len": 0,
        "no-tabs": 0,
        indent: ["error", 4],
        quotes: [2, "double"],
		"linebreak-style": 0,
		"react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
		"react/jsx-indent": [1, 4],
		"react/jsx-indent-props": [1, 4],
		"react/prop-types": 0,
    },
    globals: {},
    settings: {}
};
