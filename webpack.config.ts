import webpack from "webpack";
// Подключаем модуль path для работы с путями файлов
import path from "path";
// Подключаем плагин HtmlWebpackPlugin для генерации HTML-файла
import HtmlWebpackPlugin from "html-webpack-plugin";
// Импортируем интерфейс Configuration из модуля webpack

import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

import NodePolyfillPlugin from "node-polyfill-webpack-plugin";

const config: webpack.Configuration & { devServer: DevServerConfiguration } = {
  entry: "./src/index.tsx", // Указываем точку входа для сборки
  output: {
    path: path.resolve(__dirname, "dist"), // Указываем путь для выходных файлов
    filename: "bundle.js", // Указываем имя выходного файла
  },
  // Настраиваем расширения файлов и пути для импортов
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  devServer: {
    compress: true,
    port: 3000,
    open: true,
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          // Используем babel-loader для обработки TypeScript-файлов
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },

      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        oneOf: [
          {
            issuer: /\.(css|scss)$/,
            type: "asset/resource",
          },
          {
            use: ["@svgr/webpack"],
          },
        ],
      },

      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new NodePolyfillPlugin(),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

export default config;
