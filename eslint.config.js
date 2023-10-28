import {FlatCompat} from '@eslint/eslintrc'
import nxEslintPlugin from '@nx/eslint-plugin'
import js from '@eslint/js'
import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});
export default [
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
