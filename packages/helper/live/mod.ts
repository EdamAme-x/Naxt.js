import { Minifier } from "https://deno.land/x/framework_utils/Minifier/mod.ts";

export function LiveReload(interval: number): string {
  if (typeof interval !== "number") {
    interval = 1000;
  }

  return `
    <script defer id="_NaxtJS_LiveReload_">
    /* -- NaxtJS LiveReload -- */
    fetch("/_liveReload").then(res => {
      if (res.status !== 200) {
        document.getElementById("_NaxtJS_LiveReload_").remove()
      }
      return res.text();
    }).then(d => {
        globalThis._naxt_lr_token = d;

        setInterval(() => {
            fetch("/_liveReload").then(res => res.text()).then(d => {
                if (globalThis._naxt_lr_token !== d) {
                    location.reload()
                }
            })
        }, ${interval})
    })
    </script>
  `;
}
