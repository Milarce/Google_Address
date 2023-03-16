const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/app.ts", //root file
  output: {
    filename: "bundle.js", //output JS file name
    path: path.resolve(__dirname, "dist"), //makes an absolut path to the output folder
    publicPath: "dist", //output folder
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "/"), //webpack server loads the file in publicPath/...
    },
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.ts$/, //Searchs for ts files
        use: "ts-loader", //webpack module for typescript
        exclude: /node_modules/, //Excludes the node folder from the search
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};
