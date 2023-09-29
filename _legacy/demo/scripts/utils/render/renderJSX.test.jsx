import { renderJSX } from "./renderJSX.jsx";

function Head(props) {
  return {
    type: "Head",
    children: (
      <>
        <div style={{ display: "none" }} id={"_NAXT_HEAD_"}>
          {props.children}
        </div>
      </>
    ),
  };
}

const testCmp = (
  <>
    <Head>
      <title>Home | NaxtJS</title>
      <meta name="description" content="NaxtJS App" />
    </Head>
    <p>
      Hi
      <s>hi</s>
    </p>
  </>
);

console.log(renderJSX(testCmp));
