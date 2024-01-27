export default function TodoElement(props) {
  return (
    <div className="todoCB">
      <input type="checkbox" value={props.value} onChange={props.onChange} />
      {props.value}
      <br />
    </div>
  );
}
