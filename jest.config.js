module.exports = {
    preset: "ts-jest/presets/js-with-babel",
    testEnvironment: "node",
    "transform": {
        ".*\\.(vue)$": "vue-jest"
    },
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/src/main/$1"
    },
    moduleFileExtensions: ["js", "ts", "vue"],
}
