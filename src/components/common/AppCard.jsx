import "./AppCard.scss";

function AppCard(props) {
  const { className, ...other } = props;

  return (
    <div className={`card ${className}`} {...other}>
      {props.children}
    </div>
  );
}

export default AppCard;
