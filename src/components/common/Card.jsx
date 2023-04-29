import "./Card.scss";

function Card(props) {
  const { className, ...other } = props;

  return (
    <div className={`card ${className}`} {...other}>
      {props.children}
    </div>
  );
}

export default Card;
