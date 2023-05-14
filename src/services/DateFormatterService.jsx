import { format } from "date-fns";

export class DateFormatterService {
  static toBackendDateFormat(date) {
    return format(date, "yyyy-MM-dd");
  }

  static toSearchDateRangeString(date) {
    return format(date, "dd MMM");
  }
}
