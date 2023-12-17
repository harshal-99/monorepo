/**
 * @type {import('@remix-run/dev').AppConfig}
 */

/* eslint-disable */
module.exports = {
  ignoredRouteFiles: ["**/.*"],
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // serverBuildPath: "build/index.js",
  // publicPath: "/build/",
  watchPaths: () => require("@nx/remix").createWatchPaths(__dirname),
  serverModuleFormat: "cjs",
  browserNodeBuiltinsPolyfill: {
    modules: { os: true, path: true, crypto: true, process: true },
  },
};
