export default function onError({ context, error }) {

    console.error(error);

    return context.html(`
        <h1>Something went wrong!</h1>
    `);
}