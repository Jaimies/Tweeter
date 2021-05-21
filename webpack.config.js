const { DefinePlugin } = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const { VuetifyLoaderPlugin } = require('vuetify-loader')
const purgecssConfig = require("./config/purgecss.config")
const PurgeCSSPlugin = require('purgecss-webpack-plugin')
const { dist, src, scss } = require("./config/paths")

module.exports = (env, options) => {
    const isProduction = options.mode == "production"

    const config = {
        entry: ["./src/main/ui/Main.ts", "./resources/scss/main.scss"],
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: "ts-loader",
                },
                {
                    test: /\.vue/,
                    loader: "vue-loader",
                },
                {
                    test: /\.s?(c|a)ss$/,
                    use: [
                        "vue-style-loader",
                        {
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false,
                            },
                        },
                        "css-loader",
                        "sass-loader",
                    ],
                },
            ],
        },
        output: {
            path: dist,
            publicPath: "/",
            filename: "[name].[contenthash].js",
            clean: isProduction,
        },
        resolve: {
            extensions: [".js", ".ts", ".vue"],
            alias: {
                scss,
                "@": src,
            },
        },
        plugins: [
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: "[name].[contenthash].css",
            }),

            new HtmlWebpackPlugin({
                template: "./resources/index.html",
                filename: "index.html",
            }),
            new DefinePlugin({
                "process.env.BUILD": JSON.stringify("web"),
            }),
            new VuetifyLoaderPlugin(),
        ],
        devServer: {
            port: 3000,
            contentBase: dist,
            historyApiFallback: true,
        },
        stats: {
            colors: true,
        },
        experiments: {
            topLevelAwait: true,
        },
    }

    if (isProduction)
        config.plugins.push(
            new PurgeCSSPlugin(purgecssConfig),
        )

    return config
}
