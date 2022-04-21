const path = require("path");
const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/app.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  target: "node",
  devServer: {
    open: true,
    host: "localhost",
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {test: /\.tsx?$/, loader: "ts-loader"},
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
