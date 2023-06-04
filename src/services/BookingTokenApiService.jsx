import { BOOKING_TOKEN_BASE_URL } from "constants/api";
import { AxiosService } from "./AxiosService";

export class BookingTokenApiService {
  static getBookingQrToken = (apartmentId) => {
    const bookingQrApiPrivateFetcher = AxiosService.getPrivateFetcher(BOOKING_TOKEN_BASE_URL, false);

    let response = bookingQrApiPrivateFetcher.post("default/getJWT", {
      apartment_id: apartmentId,
    });
    return response;
  };
}
