import axios from "axios";
import { REFRESH_TOKENS_URL } from "constants/api";
import AuthService from "./AuthService";
import Cookies from "js-cookie";

export class AxiosService {
  static getPublicFetcher(baseUrl) {
    let fetcher = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return fetcher;
  }

  static getPrivateFetcher(baseUrl, needBearerPrefix = true) {
    let fetcher = axios.create({
      baseURL: baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    fetcher.interceptors.request.use(
      async (config) => {
        let accessToken = Cookies.get("access_token");

        if (accessToken) {
          config.headers = {
            ...config.headers,
            authorization: needBearerPrefix ? `Bearer ${accessToken}` : `${accessToken}`,
          };
        }

        return config;
      },
      (error) => Promise.reject(error)
    );

    fetcher.interceptors.response.use(
      (response) => response,
      async (error) => {
        const config = error?.config;

        if (error?.response?.status === 401 && !config?.sent) {
          config.sent = true;
          let refreshToken = Cookies.get("refresh_token");

          if (refreshToken) {
            try {
              const response = await axios.post(REFRESH_TOKENS_URL, {
                refresh_token: refreshToken,
              });

              if (response?.data?.access_token && response?.data?.refresh_token) {
                const newAccessToken = response.data.access_token;
                const newRefreshToken = response.data.refresh_token;

                AuthService.login({
                  accessToken: newAccessToken,
                  refreshToken: newRefreshToken,
                });

                config.headers = {
                  ...config.headers,
                  authorization: `Bearer ${newAccessToken}`,
                };
              } else {
                AuthService.logout();
              }
            } catch (error) {
              AuthService.logout();
            }
            return axios(config);
          }
        }
        return Promise.reject(error);
      }
    );
    return fetcher;
  }
}
