module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:react/jsx-runtime",
    "plugin:storybook/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "mantine",
    "prettier",
  ],
  plugins: ["react", "react-hooks", "storybook", "import", "jsx-a11y"],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    ecmaVersion: "latest",
    react: {
      version: "detect",
    },
    "import/resolver": {
      node: true,
      typescript: true,
    },
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    project: "./tsconfig.base.json",
  },
  ignorePatterns: [
    "!*.js",
    "!.storybook",
    ".*.js",
    "*.json",
    "scripts",
    "src/graphql/generated/*",
  ],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "no-warning-comments": "warn",
    "object-shorthand": "error",
    "no-param-reassign": [
      "warn",
      {
        props: true,
        ignorePropertyModificationsFor: ["acc", "next"],
      },
    ],
    "react/prop-types": "off",
    "react/self-closing-comp": [
      "error",
      {
        component: true,
        html: true,
      },
    ],
    "react/jsx-props-no-spreading": "off",
    "react/jsx-curly-brace-presence": [
      "error",
      { props: "never", children: "never" },
    ],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link", "NextLink", "RouterLink"],
        aspects: ["invalidHref"],
      },
    ],
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        pathGroups: [
          {
            pattern: "$/**",
            group: "internal",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: [
          ["builtin", "external"],
          ["internal"],
          ["parent", "sibling", "index"],
          "unknown",
        ],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "import/no-default-export": "warn",
    "import/no-extraneous-dependencies": "error",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "global-require": "warn",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: [
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "plugin:import/typescript",
      ],
      plugins: ["@typescript-eslint/eslint-plugin"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: ["./tsconfig.base.json", "./cypress/tsconfig.json"],
      },
      rules: {
        "@typescript-eslint/no-use-before-define": [
          "error",
          { functions: false },
        ],
        "@typescript-eslint/no-floating-promises": [
          "error",
          { ignoreVoid: true },
        ],
      },
    },
    {
      files: [
        "*stories.*",
        "src/pages/**/*.tsx",
        "additional.d.ts",
        "**/__mocks__/**",
        "cypress.config.ts",
      ],
      rules: {
        "import/no-anonymous-default-export": "off",
        "import/no-default-export": "off",
      },
    },
    {
      files: ["**/__tests__/**", "**/__mocks__/**"],
      env: {
        jest: true,
      },
      extends: ["plugin:testing-library/react", "plugin:jest-dom/recommended"],
      rules: {
        "testing-library/no-render-in-setup": "error",
        "testing-library/no-wait-for-empty-callback": "error",
        "testing-library/prefer-explicit-assert": "error",
        "testing-library/prefer-presence-queries": "error",
        "testing-library/prefer-screen-queries": "error",
        "testing-library/prefer-wait-for": "error",
      },
    },
    {
      files: ["**/cypress/**"],
      plugins: ["cypress"],
      extends: ["plugin:cypress/recommended"],
      env: {
        "cypress/globals": true,
      },
    },
  ],
};
