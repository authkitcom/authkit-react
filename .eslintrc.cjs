module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ["node_modules", "build", "dist", "example",
    "rollup.config.mjs"],
  root: true,
};
