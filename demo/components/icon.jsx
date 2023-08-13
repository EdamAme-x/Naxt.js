export default function Icon(props) {
  return (
    <>
      <div>
        <img src="/static/favicon.png" alt="icon" class={props.class} width={props.width} />
      </div>
    </>
  );
}
