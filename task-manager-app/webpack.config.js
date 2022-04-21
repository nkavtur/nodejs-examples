
const path = require("path");
const nodeExternals = require('webpack-node-externals')

const isProduction = process.env.NODE_ENV == "production";

const config = {
  entry: "./src/app.ts",
  externals: [nodeExternals()],
  target: 'node',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
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
