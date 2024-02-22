module.exports = [
  { // Apply to `cjs`, `.mjs` and `.js` files.
    files: ["**/*.?([cm])js"]
  },
  { // Apply to `cts`, `.mts` and `.ts` files.
    files: ["**/*.?([cm])ts"],
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        sourceType: "module"
      }
    }
  },
  {
    ignores: ["dist/**", "docs/.astro/**", "docs/dist/**"],
    plugins: {
      stylistic: require("@stylistic/eslint-plugin")
    },
    rules: {
      "stylistic/indent": ["error", 2],
      "stylistic/semi": ["error", "always"],
      "stylistic/eol-last": ["error", "always"],
      "stylistic/quotes": ["error", "double"],
      "stylistic/dot-location": ["error", "property"],
      "stylistic/array-bracket-spacing": ["error", "never"],
      "stylistic/arrow-parens": ["error", "always"],
      "stylistic/arrow-spacing": "error",
      "stylistic/block-spacing": ["error", "always"],
      "stylistic/brace-style": ["error", "stroustrup"],
      "stylistic/comma-dangle": ["error", "never"],
      "stylistic/comma-spacing": ["error", { before: false, after: true }],
      "stylistic/function-call-spacing": ["error", "never"],
      "stylistic/no-trailing-spaces": "error"
    }
  }
];
