const path = require("path");
const htmlWebpack = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new htmlWebpack({
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
