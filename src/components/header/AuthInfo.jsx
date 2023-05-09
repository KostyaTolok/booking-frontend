import "./AuthInfo.scss";
import notificationIcon from "images/notification-icon.svg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import AppLink from "components/common/AppLink";
import { LOGIN_LINK, PROFILE_LINK, REGISTER_LINK } from "constants/links";
import { useEffect, useState } from "react";
import { UsersApiService } from "services/UsersApiService";
import AlertsService from "services/AlertsService";

function AuthInfo() {
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const [fullName, setFullName] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      UsersApiService.getMe()
        .then((response) => {
          setFullName(response.data.full_name);
        })
        .catch((error) => {
          AlertsService.showAlert(error);
        });
    }
  }, [isAuthenticated]);

  return (
    <div className="auth-info">
      {isAuthenticated ? (
        <>
          <Link to="/">
            <img src={notificationIcon} alt="Notifications"></img>
          </Link>
          <Link to={PROFILE_LINK}>
            <p className="auth-info__username">{fullName}</p>
          </Link>
        </>
      ) : (
        <>
          <AppLink to={REGISTER_LINK} className="link_small link_white-outlined auth-info__link">
            Register
          </AppLink>
          <AppLink to={LOGIN_LINK} className="link_small link_white auth-info__link">
            Login
          </AppLink>
        </>
      )}
    </div>
  );
}

export default AuthInfo;
