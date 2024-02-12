import { isHolidayIfElse, isHolidaySwitch } from "./index.js";

describe("isHolidayIfElse", () => {
  it("returns true for '土'", () => {
    expect(isHolidayIfElse('土')).toBe(true); // => pass
  });

  it("returns true for '日'", () => {
    expect(isHolidayIfElse('日')).toBe(true); // => pass
  });

  it("returns false for '月'", () => {
    expect(isHolidayIfElse('月')).toBe(false); // => pass
  });
});

describe("isHolidaySwitch", () => {
  it("returns true for '土'", () => {
    expect(isHolidaySwitch('土')).toBe(true); // => pass
  });

  it("returns true for '日'", () => {
    expect(isHolidaySwitch('日')).toBe(true); // => pass
  });

  it("returns false for '月'", () => {
    expect(isHolidaySwitch('月')).toBe(false); // => pass
  });
});