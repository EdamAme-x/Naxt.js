import { moveSync } from "https://deno.land/x/std/fs/mod.ts";

try {
  const { args } = Deno;
  const appName = args[0] ? args[0] : "naxtjs-app";
  const repoUrl = "https://github.com/EdamAme-x/Naxt.js";

  const isWindows = Deno.build.os === "windows";
  const gitCmd = isWindows ? "git" : "git";
  const rmCmd = isWindows ? "del" : "rm";

  const gitProcess = Deno.run({
    cmd: [gitCmd, "clone", repoUrl, "_" + appName],
    cwd: Deno.cwd(),
  });

  await gitProcess.status();

  moveSync("_" + appName + "/demo", appName);

  await Deno.remove("_" + appName, {
    recursive: true,
  });

  Deno.writeFileSync(appName + "/deno.json", new TextEncoder().encode(Deno.readTextFileSync(appName + "/deno.json").replace("../packages/", "https://deno.land/x/naxtjs/")))
} catch (e) {
  console.error(e);
}