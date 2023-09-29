export default function onError(error, context) {

    return context.html(`
        <h1>Something went wrong! : ${error}</h1>
    `);
}