import { LiveReload } from "$naxtjs/helper/live/mod.tsx";
import { renderToString } from 'preact-render-to-string';

export default function Profile(context) {

    if (context.req.path === "/admin/p@ssw0rd") {
        return context.html(
            renderToString(
                <>
                    <h1>{" Welcome to 👑 AdminPage"}</h1>
                    <h2>Path: {context.req.path}</h2>
                    <LiveReload />
                </>
            )
        );
    }

    return context.html(
        renderToString(
            <>
                <h1>Not authenticated.</h1>
                <h2>Please Access to /admin/[pass]</h2>
            </>
        )
    )
}
