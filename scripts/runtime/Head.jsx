export function Head(props) {
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