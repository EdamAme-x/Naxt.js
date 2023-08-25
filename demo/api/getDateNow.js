export default function api(req) {

    return new Response(JSON.stringify({
        status: 200,
        body: {
            date: new Date()
        }
    }))
}