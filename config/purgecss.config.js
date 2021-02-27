const glob = require('glob')
const {src, vuetify} = require("./paths")

module.exports = {
    paths: [...glob.sync(`${vuetify}/**/*.{js,ts,vue}`), ...glob.sync(`${src}/**/*.{js,ts,vue}`)],
    safelist: {
        standard: [/data-v-/, /theme--light/, /append/, /ripple/, /progress/, "red--text"],
    },
}
