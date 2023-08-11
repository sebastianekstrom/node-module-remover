module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["standard-with-typescript", "prettier"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
  },
  overrides: [
    {
      files: [".eslintrc.js", ".eslintrc.cjs", "jest.config.js"],
      parserOptions: {
        project: null,
      },
      env: {
        node: true,
      },
    },
  ],
};
