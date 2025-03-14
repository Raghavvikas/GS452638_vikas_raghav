declare module "*.xlsx" {
  const value: string;
  export default value;
}

declare module "*.svg" {
  import * as React from "react";

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  export default ReactComponent;
}

declare module 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET_KEY: string;
    }
  }
}