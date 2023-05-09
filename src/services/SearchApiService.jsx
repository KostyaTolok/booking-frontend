import { SEARCH_API_BASE_URL } from "constants/api";
import { AxiosService } from "services/AxiosService";

export class SearchApiService {
  static searchApiPublicFetcher = AxiosService.getPublicFetcher(SEARCH_API_BASE_URL);

  static getCities() {
    return this.searchApiPublicFetcher.get("cities/");
  }
}
