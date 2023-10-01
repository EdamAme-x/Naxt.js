export async function importModuleIfSupported(path: string) {
  const fileExtension = path.split(".").pop()?.toLowerCase();

  if (
    (fileExtension === "js" ||
      fileExtension === "ts" ||
      fileExtension === "jsx" ||
      fileExtension === "tsx") &&
    !path.split("/").pop()?.startsWith("^")
  ) {
    try {
      const module = await import(path);
      return module;
    } catch (e: string | unknown) {
      throw Error(
        `\n\n 🌊: There is a problem with the exported function. \n\n ${e}`
      );
    }
  }
  return null;
}
