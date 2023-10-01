export function ParseRelativePathStatic(path: string): string {
  const prefix = path.split("/").pop()?.split("")[0];

  if (prefix === "^") {
    return path.replace(/\/\^/, "/");
  }

  return path;
}
