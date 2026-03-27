import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000,
    open: false,
    //если статика через ngnix то нужно проксирование на index.html
    historyApiFallback: true,// как один флаг решает какой будет роутер??
  };
}
