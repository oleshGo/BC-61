module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["standard", "prettier, plugin:jest/recommended"],
  plugins: ["jest"],
  parserOptions: {
    ecmaVersion: 12,
  },

  plugins: ["jest"],
  rules: {},
};
