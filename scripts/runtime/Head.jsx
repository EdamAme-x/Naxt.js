export function Head(props) {
  return (
    <>
      <div style={{ display: "none" }} id={"_NAXT_HEAD_"}>
        {props.children}
      </div>
    </>
  );
}
