const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@c": path.resolve(__dirname, "src/components"),
        "@sc": path.resolve(__dirname, "src/scss"),

        // "@m": path.resolve(__dirname, "src/mixins"),
        // "@r": path.resolve(__dirname, "src/router"),
        // "@st": path.resolve(__dirname, "src/store"),
        // "@v": path.resolve(__dirname, "src/views"),
        // "@pj": path.resolve(__dirname, "package.json"),
      },
    },
  },
};
