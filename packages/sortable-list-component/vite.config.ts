/// <reference types='vitest' />
// eslint-disable-next-line import/no-extraneous-dependencies
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
// eslint-disable-next-line import/no-extraneous-dependencies
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from "vite";

// eslint-disable-next-line import/no-default-export
export default defineConfig({
  cacheDir: "../../node_modules/.vite/sortable-list-component",

  server: {
    port: 4200,
    host: "localhost",
  },

  preview: {
    port: 4300,
    host: "localhost",
  },

  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
    nxViteTsPaths(),
  ],

  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },

  test: {
    globals: true,
    cache: {
      dir: "../../node_modules/.vitest",
    },
    environment: "jsdom",
    include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
  },
});
