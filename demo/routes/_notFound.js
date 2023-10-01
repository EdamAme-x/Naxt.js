export default function notFound(context) {
    return context.text(`
        404 Not Found
    `, 404);
}