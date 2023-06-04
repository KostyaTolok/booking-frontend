import "./Facilities.scss";

function Facilities(props) {
  return (
    <div className="facilities">
      <p className="facilities__title">Facilities</p>
      {props.children}
    </div>
  );
}

export default Facilities;
