import { format } from "date-fns";

export class DateFormatterService {
  static toBackendDateFormat(date) {
    return format(date, "yyyy-MM-dd");
  }

  static toShortDateFormat(date) {
    return format(date, "d MMM");
  }

  static toFullDateFormat(date) {
    return format(date, "dd.MM.yyyy");
  }

  static getDaysBetweenDates(startDate, endDate) {
    let difference = endDate.getTime() - startDate.getTime();
    let days = Math.ceil(difference / (1000 * 3600 * 24));
    return days + 1;
  }
}
