declare module "*.svg" {
  import { ComponentType } from "react";
  const ReactComponent: {
    attributes: { [key: string]: string };
    content: string;
  };
  export default ReactComponent;
}
