const {DefinePlugin} = require("webpack")
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
            scss: path.resolve(__dirname, "./resources/scss"),
            "@": path.resolve(__dirname, "./src/main")
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
        }),
        new DefinePlugin({
            "process.env.BUILD": JSON.stringify("web")
        })
    ],
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, "dist/"),
        historyApiFallback: true,
    },
    stats: {
        colors: true
    },
    experiments: {
        topLevelAwait: true
    }
}
