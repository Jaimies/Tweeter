module.exports = {
    preset: "ts-jest/presets/js-with-babel",
    testEnvironment: "node",
    "transform": {
        ".*\\.(vue)$": "vue-jest"
    },
    moduleFileExtensions: ["js", "ts", "vue"],
    globals: {
        "ts-jest": {
            diagnostics: false,
            isolatedModules: true
        }
    }
}
