const path = require("path");
const HtmlPlug = require("html-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "/index"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
    ],
  },
  plugins: [
    new HtmlPlug({
      template: "/src/index.html",
    }),
  ],
};
