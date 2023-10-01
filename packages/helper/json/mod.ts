import { Minifier } from "https://deno.land/x/framework_utils/Minifier/mod.ts";

export function json(strings: string[], ...values: string[]) {
  let result = "";
  for (let i = 0; i < strings.length; i++) {
    result += strings[i];
    if (i < values.length) {
      result += values[i];
    }
  }

  let resultJSON = "";

  try {
    resultJSON = Minifier("json", result);
  } catch (_e) {
    return result;
  }

  return resultJSON;
}
