const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require("path")

module.exports = {
    entry: ["./src/main/ui/Main.ts", "./resources/scss/main.scss"],
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.vue/,
                loader: "vue-loader"
            },
            {
                test: /\.s?css/,
                use: [
                    "vue-style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".vue"],
        alias: {
            scss: path.resolve(__dirname, "./resources/scss")
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            template: "./resources/index.html",
            filename: "index.html"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist/")
    }
}
