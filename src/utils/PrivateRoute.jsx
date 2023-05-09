import { LOGIN_LINK } from "constants/links";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to={LOGIN_LINK} />;
}

export default PrivateRoute;
