const path = require("path")

module.exports = {
    src: path.resolve(__dirname, "../src/main"),
    scss: path.resolve(__dirname, "../resources/scss"),
    vuetify: path.resolve(__dirname, "../node_modules/vuetify/lib/components"),
    dist: path.resolve(__dirname, "../firebase/public/"),
}
