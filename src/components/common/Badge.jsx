import "./Badge.scss";

function Badge(props) {
  return <span className={`badge ${props.className}`}>{props.children}</span>;
}

export default Badge;
