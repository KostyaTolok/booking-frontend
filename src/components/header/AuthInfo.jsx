import "./AuthInfo.scss";
import notificationIcon from "images/notification-icon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import avatar from "images/avatar.png";
import AppLink from "components/common/AppLink";

function AuthInfo() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);

  return (
    <div className="auth-info">
      {isAuthenticated ? (
        <>
          <Link to="/">
            <img src={notificationIcon} alt="Notifications"></img>
          </Link>
          <Link to="/">
            <Avatar src={avatar} className="auth-info__avatar" sx={{ width: 34, height: 34 }} />
          </Link>
          <Link to="/">
            <p className="auth-info__username">Ivan22834a</p>
          </Link>
        </>
      ) : (
        <>
          <AppLink to="/" className="link_small link_outlined auth-info__link">
            Register
          </AppLink>
          <AppLink to="/" className="link_small link_white auth-info__link">
            Login
          </AppLink>
        </>
      )}
    </div>
  );
}

export default AuthInfo;
