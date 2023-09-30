import { Minifier } from "https://deno.land/x/framework_utils/Minifier/mod.ts";

export function html(strings: string[], ...values: string[]) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += values[i];
    }
  }
  return Minifier("html", result);
}
