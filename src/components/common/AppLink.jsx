import { Link } from "react-router-dom";
import "./AppLink.scss";

function AppLink(props) {
  const { className, ...other } = props;

  return (
    <Link className={`link ${className}`} {...other}>
      {props.children}
    </Link>
  );
}

export default AppLink;
