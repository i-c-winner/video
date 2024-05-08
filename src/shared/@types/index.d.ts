declare module "*.svg" {
  const ReactComponent: {
    attributes: { [key: string]: string };
    content: string;
  };
  export default ReactComponent;
}
