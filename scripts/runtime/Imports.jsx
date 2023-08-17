export function Imports(props) {
  const CSSPath = props.css || [];
  const JSPath = props.js || [];
  let children = "";

  for (let i = 0; i < CSSPath.length; i++) {
    const filePath = CSSPath[i];
    children += `<link rel="stylesheet" href="${filePath}" />`;
  }

  for (let i = 0; i < JSPath.length; i++) {
    const filePath = JSPath[i];
    children += `<script src="${filePath}" async></script>`;
  }

  return {
    type: "Imports",
    children: (
      <>
        <div style={{ display: "none" }} id={"_NAXT_IMPORTS_"}>
          {encodeURIComponent(children)}
        </div>
      </>
    ),
  };
}

/**
 * <Imports css={["/static/main.css", "/static/sub.css"]} js={["/static/main.js", "/static/sub.js"]} />
 */
