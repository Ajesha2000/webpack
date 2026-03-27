import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { customBabelPlugin } from "./babel/customBabelPlugin";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development";
  const isProd = !isDev;

  const assetsLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgLoader = {
    test: /\.svg$/i,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const cssLoader = {
    test: /\.css$/i,
    use: [
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      cssLoaderWithModules,
    ],
  };

  const tsLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => {
            if (isDev) {
              return {
                before: [ReactRefreshTypeScript()],
              };
            }
            return {
              before: [],
            };
          },
        },
      },
    ],
    exclude: /node_modules/,
  };

  const babelLoader = {
    test: /\.tsx?$/,
    use: [
      {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-typescript",
            [
              "@babel/preset-react",
              {
                runtime: isDev ? "automatic" : "classic",
              },
            ],
          ],
          plugins: isProd
            ? [[customBabelPlugin, { props: "data-testid" }]]
            : [],
        },
      },
    ],
    exclude: /node_modules/,
  };

  return [
    assetsLoader,
    scssLoader,
    cssLoader,
    //tsLoader,
    babelLoader,
    svgLoader,
  ];
}
