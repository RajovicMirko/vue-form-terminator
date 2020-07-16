const path = require("path");

module.exports = {
  css: { extract: false },
  configureWebpack: {
    resolve: {
      alias: {
        "@c": path.resolve(__dirname, "src/components"),
        "@js": path.resolve(__dirname, "src/js"),
        "@sc": path.resolve(__dirname, "src/scss"),
        "@t": path.resolve(__dirname, "src/test-project"),
      },
    },
  },
};
