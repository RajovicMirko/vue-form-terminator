const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@c": path.resolve(__dirname, "src/components"),
        "@js": path.resolve(__dirname, "src/js"),
        "@m": path.resolve(__dirname, "src/mixins"),
        "@sc": path.resolve(__dirname, "src/scss"),
        "@r": path.resolve(__dirname, "src/router"),
        "@v": path.resolve(__dirname, "src/views"),
        "@t": path.resolve(__dirname, "src/test-project"),
      },
    },
  },

  css: {
    extract: false,
    loaderOptions: {
      sass: {
        prependData: `
          @import "@sc/variables.scss";
          @import "@sc/global.scss";
        `,
      },
    },
  },
};
