export default function onError(error, c) {
    console.error(error);
    return c.text(`Something went wrong! \n ${error}`);
}