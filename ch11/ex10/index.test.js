import {
  getDaysInMonth,
  countWeekdays,
  getDayOfWeek,
  getFirstDayOfLastMonth,
} from "./index.js";

describe("getDaysInMonth", () => {
  it("returns the number of days in a given month", () => {
    // 閏年も考慮
    expect(getDaysInMonth(2022, 2)).toBe(28); // February in a non-leap year
    expect(getDaysInMonth(2020, 2)).toBe(29); // February in a leap year
    expect(getDaysInMonth(2022, 1)).toBe(31); // January
    expect(getDaysInMonth(2022, 4)).toBe(30); // April
  });
});

describe("countWeekdays", () => {
  it("returns the number of weekdays in a given period", () => {
    expect(countWeekdays("2022-01-01", "2022-01-31")).toBe(21); // January 2022 has 21 weekdays
    expect(countWeekdays("2022-02-01", "2022-02-28")).toBe(20); // February 2022 has 20 weekdays
  });
});

describe("getDayOfWeek", () => {
  it("returns the day of the week for a given date in a given locale", () => {
    // 2022年1月1日が英語ロケールで「Saturday」であることを検証
    expect(getDayOfWeek("2022-01-01", "en-US")).toBe("Saturday");
    // 同様に、他の日付についても曜日が正しいかを検証
    expect(getDayOfWeek("2022-01-02", "en-US")).toBe("Sunday");
    expect(getDayOfWeek("2022-01-03", "en-US")).toBe("Monday");
    // 日本語ロケールでの曜日も検証
    expect(getDayOfWeek("2022-01-01", "ja-JP")).toBe("土曜日");
    expect(getDayOfWeek("2022-01-02", "ja-JP")).toBe("日曜日");
    expect(getDayOfWeek("2022-01-03", "ja-JP")).toBe("月曜日");
  });
});

describe("getFirstDayOfLastMonth", () => {
  it("returns the Date object for the first day of last month at 0:00:00", () => {
    const now = new Date(); // 現在の日付を取得
    const year = now.getFullYear(); // 現在の年と月を取得
    const month = now.getMonth(); // 0-11
    const firstDayOfLastMonth = getFirstDayOfLastMonth(); // getFirstDayOfLastMonth関数を呼び出し

    // 先月の1日の年、月、日、時、分、秒が正しいかを検証
    expect(firstDayOfLastMonth.getFullYear()).toBe(
      month === 0 ? year - 1 : year
    );
    expect(firstDayOfLastMonth.getMonth()).toBe(month === 0 ? 11 : month - 1);
    expect(firstDayOfLastMonth.getDate()).toBe(1);
    expect(firstDayOfLastMonth.getHours()).toBe(0);
    expect(firstDayOfLastMonth.getMinutes()).toBe(0);
    expect(firstDayOfLastMonth.getSeconds()).toBe(0);
  });
});
