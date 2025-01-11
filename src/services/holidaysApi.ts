interface Holiday {
  date: string;
  localName: string;
}

export interface HolidaysMap {
  [key: string]: string[];
}

export class HolidaysService {
  private static readonly BASE_URL = "https://date.nager.at/api/v3";
  private static readonly COUNTRY_CODE = "UA";

  public static async getHolidaysByYear(year: number): Promise<HolidaysMap> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/PublicHolidays/${year}/${this.COUNTRY_CODE}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: Holiday[] = await response.json();

      // Convert the array of holidays into Map for easy access by date
      const holidaysMap: HolidaysMap = {};
      data.forEach((holiday) => {
        holidaysMap[holiday.date] = holidaysMap[holiday.date] || [];
        holidaysMap[holiday.date].push(holiday.localName);
      });

      return holidaysMap;
    } catch (error) {
      console.error("Error fetching holidays:", error);
      return {};
    }
  }
}
