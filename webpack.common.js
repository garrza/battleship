const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/app/index.js",
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/public/template.html",
    }),
  ],
};
