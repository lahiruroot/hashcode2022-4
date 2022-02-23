module.exports = {
  root: true,
  plugins: ["eslint-plugin", "@typescript-eslint", "import", "eslint-comments"],
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  rules: {
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      { vars: "all", args: "none" },
    ],
    "no-restricted-properties": [
      "error",
      {
        object: "console",
        property: "log",
        message:
          "Use semantic methods [debug(), info(), warn(), error()] instead.",
      },
    ],
  },
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
  },
};
