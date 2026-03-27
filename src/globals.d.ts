declare module "*.module.scss" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.module.css" {
  const classNames: Record<string, string>;
  export default classNames;
}

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg" {
  import React from "react";
  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare const __PLATFORM__: "mobile" | "desktop";
