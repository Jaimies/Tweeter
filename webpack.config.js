const {DefinePlugin} = require("webpack")
const VueLoaderPlugin = require("vue-loader/lib/plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const {VuetifyLoaderPlugin} = require('vuetify-loader')
const path = require("path")
const glob = require('glob')
const PurgeCSSPlugin = require('purgecss-webpack-plugin')

const dist = path.resolve(__dirname, "firebase/public/")
const vuetify = path.join(__dirname, "node_modules/vuetify/lib/components")
const src = path.resolve(__dirname, "./src/main")
module.exports = (env, options) => {
    const config = {
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
                    test: /\.s?(c|a)ss$/,
                    use: [
                        "vue-style-loader",
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "sass-loader"
                    ]
                }
            ]
        },
        output: {
            path: dist
        },
        resolve: {
            extensions: [".js", ".ts", ".vue"],
            alias: {
                scss: path.resolve(__dirname, "./resources/scss"),
                "@": src
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
            }),
            new VuetifyLoaderPlugin(),
        ],
        devServer: {
            port: 3000,
            contentBase: dist,
            historyApiFallback: true,
        },
        stats: {
            colors: true
        },
        experiments: {
            topLevelAwait: true
        }
    }

    if (options.mode == "production")
        config.plugins.push(
            new PurgeCSSPlugin({
                paths: [...glob.sync(`${vuetify}/**/*.{js,ts,vue}`), ...glob.sync(`${src}/**/*.{js,ts,vue}`)],
                safelist: {
                    standard: [/data-v-/, /theme--light/, /ripple/, /progress/],
                },
            }),
        )
    return config
}
