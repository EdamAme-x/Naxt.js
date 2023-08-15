function renderJSX(JSX) {
  let HeadString = "";

  const escapeChars = {
    "<": "&lt;",
    ">": "&gt;",
    "&": "&amp;",
    "'": "&#39;",
    '"': "&#34;",
  };

  const escapeHTML = (text) => {
    return text.replaceAll(/[&<>"']/g, (char) => escapeChars[char]);
  };

  const emptyTags = [
    "area",
    "base",
    "br",
    "col",
    "embed",
    "hr",
    "img",
    "input",
    "keygen",
    "link",
    "meta",
    "param",
    "source",
    "track",
    "wbr",
  ];

  const renderToString = (element) => {
    if (element instanceof Array) {
      return element.map((node) => {
        return renderToString(node);
      }).join("");
    } else {
      if (!element.type) {
        return escapeHTML(String(element));
      } else if (typeof element.type === "function") {
        const resultNode = element.type(element.props);
        return renderToString(resultNode);
      } else if (element.type.substring(0, 7) === "Fragment") {
        switch (element.type) {
          case "Fragment":
            return element.props.children.map((node) => {
              return renderToString(node);
            }).join("");
        }
      } else if (element.type === "Head") {
        HeadString += renderToString(
          element.children.props.children.props.children
        );
      } else {
        const excludeProps = ["dangerouslySetInnerHTML", "children"];
        const propsString = Object.entries(element.props || {})
          .filter(([key, _value]) => !excludeProps.includes(key))
          .map(([key, value]) => {
            if (key === "style" && typeof value === "object") {
              const styleString = Object.entries(value)
                .map(([styleKey, styleValue]) => `${styleKey}: ${styleValue};`)
                .join(" ");
              return `${key}="${styleString}"`;
            }
            return `${key}="${value}"`;
          })
          .join(" ");
        if (emptyTags.includes(element.type)) {
          return `<${element.type}${propsString ? " " + propsString : ""} />`;
        }
        const childText =
          element.props.dangerouslySetInnerHTML?.__html ||
          (element.props?.children
            ? renderToString(element.props.children)
            : "");
        return `<${element.type}${propsString ? " " + propsString : ""}>${childText}</${element.type}>`;
      }
    }
  }

  const Strings = renderToString(JSX);

  return [Strings, HeadString];
}

export { renderJSX };
