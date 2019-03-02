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
                resolve: {extensions: ['.tsx', '.ts', '.js']},
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.s?css$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
};

module.exports = config;