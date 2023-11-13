export default {
  "*.{ts,tsx,js,mjs,cjs}": [
    "prettier --write --ignore-unknown",
    "eslint --fix",
  ],
};
