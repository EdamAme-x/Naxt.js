import { SearchPath } from "./SearchPath.jsx";

/**
 * SearchPath("/index", naxtMap["view"], <p>Error!</p>);
 * returns {
 *   jsx_component: {
 *     レンダリング対象  $1とかの奴 => これをServerSideJSXに渡す (JSX, headJSX, config) (config=heads)
 *  },
 *  id_routing: "" // [id]等で取得した値
 * };
 */

export { SearchPath };