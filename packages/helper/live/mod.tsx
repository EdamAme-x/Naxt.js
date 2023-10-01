import { LiveReload as LiveReloadScript } from "./mod.ts";

export function LiveReload(props: { interval?: number | undefined }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: LiveReloadScript(props.interval) }}
    ></div>
  );
}
