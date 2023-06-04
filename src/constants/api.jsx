const IP_ADDRESS = process.env.REACT_APP_BACKEND_IP_ADDRESS;

export const API_BASE_URL = `http://${IP_ADDRESS}`;
export const SEARCH_API_BASE_URL = `${API_BASE_URL}/search/api`;

export const USERS_API_BASE_URL = `${API_BASE_URL}/users/api/v1`;

export const REFRESH_URL_PATH = "/auth/refresh";
export const USERS_ME_URL_PATH = "/users/me";

export const REFRESH_TOKENS_URL = `${USERS_API_BASE_URL}${REFRESH_URL_PATH}`;
export const USERS_ME_URL = `${USERS_API_BASE_URL}${USERS_ME_URL_PATH}`;

export const PAYMENTS_API_BASE_URL = `${API_BASE_URL}/payments/api/v1`;

export const BOOKING_TOKEN_BASE_URL = `http://tmyjvl0g7l.execute-api.us-west-2.amazonaws.com/`;
