const path = require("path");

const config = {
    entry: {
        main: ["./resources/js/main.jsx", "./resources/js/user.js"],
        user: "./resources/js/user.js"
    },
    output: {
        path: path.resolve(__dirname, "public/js"),
        publicPath: "/public/",
        filename: "[name].js",
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                resolve: {extensions: [".js", ".jsx"]},
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {targets: {esmodules: true}}],
                            "@babel/react"
                        ],
                        plugins: [
                            // "@babel/plugin-transform-regenerator",
                            "@babel/plugin-syntax-dynamic-import",
                            "@babel/plugin-proposal-class-properties",
                        ]
                    }
                }
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};

module.exports = config;