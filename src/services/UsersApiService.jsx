import { REFRESH_URL_PATH, USERS_API_BASE_URL, USERS_ME_URL_PATH } from "constants/api";
import { AxiosService } from "services/AxiosService";

export class UsersApiService {
  static usersApiPublicFetcher = AxiosService.getPublicFetcher(USERS_API_BASE_URL);
  static usersApiPrivateFetcher = AxiosService.getPrivateFetcher(USERS_API_BASE_URL);

  static createUser({ email, fullName, password }) {
    return this.usersApiPublicFetcher.post("users", {
      email: email,
      full_name: fullName,
      password: password,
    });
  }

  static login = ({ email, password }) => {
    let response = this.usersApiPublicFetcher.post("auth/login", {
      email: email,
      password: password,
    });
    return response;
  };

  static refreshTokens = (refreshToken) => {
    let response = this.usersApiPublicFetcher.post(
      REFRESH_URL_PATH,
      {
        refresh_token: refreshToken,
      },
      { withCredentials: true }
    );
    return response;
  };

  static sendVerificationCodeEmail() {
    let response = this.usersApiPrivateFetcher.post("users/verify-email", {});
    return response;
  }

  static verifyEmail(code) {
    let response = this.usersApiPrivateFetcher.post("users/verify-email/confirm", {
      code: code,
    });
    return response;
  }

  static resetPasswordSendEmail = (email) => {
    let response = this.usersApiPrivateFetcher.post("users/reset-password", {
      email: email,
    });
    return response;
  };

  static resetPasswordConfirm = ({ token, newPassword }) => {
    let response = this.usersApiPrivateFetcher.post("users/reset-password/confirm", {
      token: token,
      new_password: newPassword,
    });
    return response;
  };

  static getMe() {
    let response = this.usersApiPrivateFetcher.get(USERS_ME_URL_PATH);
    return response;
  }

  static updateUserInfo = ({ email, fullName }) => {
    let response = this.usersApiPrivateFetcher.put(USERS_ME_URL_PATH, {
      email: email,
      full_name: fullName,
    });
    return response;
  };

  static updatePassword = (newPassword) => {
    let response = this.usersApiPrivateFetcher.put(USERS_ME_URL_PATH, {
      password: newPassword,
    });
    return response;
  };

  static deleteMe = () => {
    let response = this.usersApiPrivateFetcher.delete(USERS_ME_URL_PATH);
    return response;
  };
}
