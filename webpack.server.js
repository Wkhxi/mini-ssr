/**
 * 将 server.js 代码和依赖项都打包到 build 下的 server.bundle.js
 *  node 命令启动server.bundle.js
 */

const path = require("path");

module.exports = {
  mode: "development",
  target: "node",
  entry: "./server.js",
  output: {
    filename: "server.bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
