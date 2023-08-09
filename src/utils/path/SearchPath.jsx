export function SearchPath(path, pathMap, _error404_jsx) {

    const pathArray = path.split("/");

    if (_error404_jsx === undefined) {
        _error404_jsx = <p>404 Not Found | path: {path}</p>;
    }

    const resultObject = {
        jsx_component: _error404_jsx,
        id_routing: ""
    };

    for (const [value, jsxComponent] of Object.entries(pathMap)) {

        const valueArray = value.split("/");
        let matched = true;

        if (pathArray[pathArray.length - 1] === "") {
            pathArray[pathArray.length - 1] = "index";
        }

        if (valueArray.length !== pathArray.length) {
            continue;
        }

        for (let i = 0; i < valueArray.length; i++) {
            if (valueArray[i] !== pathArray[i] && !valueArray[i].startsWith("[") && !valueArray[i].endsWith("]")) {
                matched = false;
                break;
            }
        }

        if (matched) {
            for (let i = 0; i < valueArray.length; i++) {
                if (valueArray[i].startsWith("[") && valueArray[i].endsWith("]")) {
                    resultObject.id_routing = pathArray[i];
                    break;
                }
            }

            resultObject.jsx_component = jsxComponent;
            break;
        }
    }

    return resultObject;
}
