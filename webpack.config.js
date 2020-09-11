const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/main/ts/ui/Main.ts",
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            }
        ]
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/main/resources/index.html",
            filename: "index.html"
        })
    ]
}