import "./Card.scss";

function Card(props) {
  return <div {...props}>{props.children}</div>;
}

export default Card;
