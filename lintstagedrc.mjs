// eslint-disable-next-line import/no-default-export
export default {
  "*.{ts,tsx,js,mjs,cjs,json}": [
    "prettier --write --ignore-unknown",
    "eslint --fix",
  ],
};
