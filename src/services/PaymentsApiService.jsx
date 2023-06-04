import { PAYMENTS_API_BASE_URL } from "constants/api";
import { AxiosService } from "./AxiosService";
import { DateFormatterService } from "./DateFormatterService";

export class PaymentsApiService {
  static paymentsApiPrivateFetcher = AxiosService.getPrivateFetcher(PAYMENTS_API_BASE_URL, false);

  static paymentSheet({ apartmentId, startDate, endDate }) {
    return this.paymentsApiPrivateFetcher.post("payment/payment-sheet", {
      apartment_id: apartmentId,
      start_date: startDate ? DateFormatterService.toBackendDateFormat(new Date(startDate)) : "",
      end_date: endDate ? DateFormatterService.toBackendDateFormat(new Date(endDate)) : "",
    });
  }
}
