export default function onError(error, c) {

    return c.text(`Something went wrong! \n ${error}`);
}