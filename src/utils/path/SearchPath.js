export function SearchPath(path, pathMap) {

    /**
     {
        "/index": $0,
        "/id/[id]": $1,
        "/profile": $2
     }

     => {path} => return {$N}
     => /index => $0
     => /id/hoeghoge => $1
     => /profile => $2
     */

    if (path.slice(-1) === "/") {
        path = path.slice(0, -1);
    } // 最後の / は除く

    const pathArray = path.split("/"); // /id/hogehoge => ["", "id", "hogehoge"]

    pathMap.forEach((value, key) => {

    })

}