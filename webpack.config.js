const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const path = require("path")

module.exports = {
    entry: "./src/main/ts/ui/Main.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.vue/,
                loader: "vue-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts", ".vue"]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: "./src/main/resources/index.html",
            filename: "index.html"
        })
    ],
    devServer: {
        contentBase: path.resolve(__dirname, "dist/")
    }
}