const { FlatCompat } = require("@eslint/eslintrc");
const nxEslintPlugin = require("@nx/eslint-plugin");
const js = require("@eslint/js");
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
module.exports = [
  ...compat.extends("prettier"),
  { plugins: { "@nx": nxEslintPlugin } },
  {
    files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
    rules: {
      "@nx/enforce-module-boundaries": [
        "error",
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: "*",
              onlyDependOnLibsWithTags: ["*"],
            },
          ],
        },
      ],
    },
  },
  ...compat.config({ extends: ["plugin:@nx/typescript", "@remix-run/eslint-config", "@remix-run/eslint-config/node"] }).map((config) => ({
    ...config,
    files: ["**/*.ts", "**/*.tsx"],
    rules: {},
  })),
  ...compat.config({ extends: ["plugin:@nx/javascript"] }).map((config) => ({
    ...config,
    files: ["**/*.js", "**/*.jsx"],
    rules: {},
  })),
  { ignores: ["node_modules\r"] },
];
