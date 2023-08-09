export default function api(req, info) {

    /**
     * req.$_GET["id"]
     * info.ip
     * info.ua
     */

    return new Response(JSON.stringify({
        status: 200,
        body: {
            date: new Date()
        }
    }))
}