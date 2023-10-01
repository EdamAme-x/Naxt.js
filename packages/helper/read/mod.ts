export function read(relativePath: string, base: string) {
  return Deno.readTextFileSync(new URL(relativePath, base));
}
