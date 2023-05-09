import axios from "axios";
import { REFRESH_TOKENS_URL } from "constants/api";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { setIsAuthenticated } from "redux/actions/authActions";
import store from "redux/store";

class AuthService {
  static getTokenOptions(token) {
    return {
      expires: new Date(jwtDecode(token).exp * 1000),
      sameSite: "strict",
    };
  }

  static login(accessToken, refreshToken) {
    Cookies.set("access_token", accessToken, this.getTokenOptions(accessToken));
    Cookies.set("refresh_token", refreshToken, this.getTokenOptions(refreshToken));
    store.dispatch(setIsAuthenticated(true));
  }

  static logout() {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    store.dispatch(setIsAuthenticated(false));
  }

  static refreshTokens() {
    let promise = new Promise((resolve) => {
      let refreshToken = Cookies.get("refresh_token");

      if (refreshToken) {
        axios
          .post(REFRESH_TOKENS_URL, {
            refresh_token: refreshToken,
          })
          .then((response) => {
            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;
            this.login(accessToken, refreshToken);
            resolve();
          })
          .catch(() => {
            this.logout();
            resolve();
          });
      } else {
        this.logout();
        resolve();
      }
    });

    return promise;
  }

  static getEmailFromJwt() {
    const accessToken = Cookies.get("access_token");

    if (!accessToken) {
      return null;
    }

    const email = jwtDecode(accessToken).email;
    return email;
  }
}

export default AuthService;
