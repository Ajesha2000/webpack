import webpack, { Configuration, DefinePlugin } from "webpack";
import { BuildOptions } from "./types/types";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import path from "path";
import CopyPlugin from "copy-webpack-plugin";

export function buildPlugins(options: BuildOptions): Configuration["plugins"] {
  const { analyzer, paths, mode, platform } = options;

  const isDev = mode === "development";
  const isProd = !isDev;

  const plugins: Configuration["plugins"] = [
    new HtmlWebpackPlugin({
      template: path.resolve(paths.public, "index.html"),
      favicon: path.resolve(paths.public, "logo.svg"),
    }),
    new DefinePlugin({
      __PLATFORM__: JSON.stringify(platform),
    }),
    new ForkTsCheckerWebpackPlugin(),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin());
    plugins.push(new ReactRefreshWebpackPlugin());
  }

  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(paths.public, "locales"),
            to: path.resolve(paths.output, "locales"),
          },
        ],
      })
    );
  }

  if (analyzer) {
    plugins.push(new BundleAnalyzerPlugin());
  }

  return plugins;
}
