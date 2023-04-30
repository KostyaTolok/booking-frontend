import axios from "axios";

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
}
