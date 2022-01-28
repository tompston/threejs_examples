const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        // figure out how to make this into a for loop. Later
        main: resolve(__dirname, "index.html"),
        01: resolve(__dirname, "examples/01.html"),
        02: resolve(__dirname, "examples/02.html"),
        03: resolve(__dirname, "examples/03.html"),
        04: resolve(__dirname, "examples/04.html"),
        05: resolve(__dirname, "examples/05.html"),
        // 06: resolve(__dirname, "examples/06.html"),
        // 07: resolve(__dirname, "examples/07.html"),
        // 08: resolve(__dirname, "examples/08.html"),
        // 09: resolve(__dirname, "examples/09.html"),
      },
    },
  },
});
