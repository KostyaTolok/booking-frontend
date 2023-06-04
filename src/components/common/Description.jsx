import "./Description.scss";

function Description(props) {
  return (
    <div className="description">
      <p className="description__title">Description</p>
      <p className="description__text">{props.text}</p>
    </div>
  );
}

export default Description;
