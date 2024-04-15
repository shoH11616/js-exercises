import { any, catching } from "./index.js";

describe("any", () => {
  it("returns true if any of the functions return true", () => {
    const isNonZero = any(
      (n) => n > 0,
      (n) => n < 0
    );
    expect(isNonZero(0)).toBe(false);
    expect(isNonZero(42)).toBe(true);
    expect(isNonZero(-0.5)).toBe(true);
  });
});

describe("catching", () => {
  it("returns the result of the first function if no error occurs", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse('{"a": 1}')).toEqual({ a: 1 });
  });

  it("returns the result of the second function if an error occurs", () => {
    const safeJsonParse = catching(JSON.parse, (e) => {
      return { error: e.toString() };
    });
    expect(safeJsonParse("{Invalid Json}")).toEqual({
      error: expect.stringContaining("SyntaxError"),
    });
  });
});
