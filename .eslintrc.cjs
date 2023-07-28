module.exports = {
  plugins: [
    "@typescript-eslint",
    "jsx-a11y",
    "react-refresh",
    "react-hooks",
    "effector",
    "unicorn",
    "import",
    "prettier",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:effector/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: 2021,
    sourceType: "module"
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true
      }
    }
  },
  root: true,
  env: {
    es6: true,
    es2022: true,
    browser: true,
    node: true
  },
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true
        },
        pathGroups: [
          {
            pattern: "react{,-*,/*}",
            group: "builtin",
            position: "after"
          },
          {
            pattern: "effector{,-*,-*/*}",
            group: "external",
            position: "after"
          },
          {
            pattern: "**/?(*)app{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/?(*)processes{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/?(*)pages{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/?(*)widgets{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/?(*)features{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/?(*)entities{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/?(*)shared{,/**}",
            group: "internal",
            position: "after"
          },
          {
            pattern: "**/*.{scss,css,sass}",
            group: "internal",
            position: "after"
          }
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
        groups: ["builtin", "external", "internal", "parent", "sibling", "index"]
      }
    ],
  },
}
