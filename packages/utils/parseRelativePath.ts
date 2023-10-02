export function ParseRelativePath(path: string): string {
  const extensions = [".tsx", ".jsx", ".ts", ".js"];

  for (const ext of extensions) {
    if (path.endsWith(ext)) {
      path = path.slice(0, -ext.length);
      break;
    }
  }

  path = path.replaceAll(/\/@/g, "/:");
  path = path.replaceAll(/\/_all/g, "/*");
  path = path.replaceAll(/\/^/g, "/");

  path = path.replace(/\/index$/, "/");

  return path;
}
