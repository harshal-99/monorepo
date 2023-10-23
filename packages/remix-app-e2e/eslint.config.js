const { FlatCompat } = require("@eslint/eslintrc");
const baseConfig = require("../../eslint.config.js");
const js = require("@eslint/js");
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...baseConfig,
  ...compat.extends("plugin:cypress/recommended"),
  {
    files: [
      "packages/remix-app-e2e/**/*.ts",
      "packages/remix-app-e2e/**/*.tsx",
      "packages/remix-app-e2e/**/*.js",
      "packages/remix-app-e2e/**/*.jsx",
    ],
    rules: {},
  },
];
