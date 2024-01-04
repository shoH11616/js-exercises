import { abs, sum, factorial } from "./index.js";

// TypeScript の場合は以下:
// import { abs, sum, factorial } from "./index.ts";

describe("math", () => {
  describe("abs", () => {
    it("returns same value when positive value given", () => {
      expect(abs(42)).toBe(42); // => pass
    });

    it("returns negated value when negative value given", () => {
      expect(abs(-42)).toBe(42); // => pass
    });

    it("returns zero value when zero given", () => {
      expect(abs(0)).toBe(0); // => pass
    });
  });

  // 以下に sum, factorial のテストを記載せよ
  describe("sum", () => {
    it("returns the correct sum of positive numbers in an array", () => {
      expect(sum([1, 2, 3])).toBe(6); // => pass
    });

    it("returns 0 when an empty array is given", () => {
      expect(sum([])).toBe(0); // => pass
    });

    it("returns the correct sum of negative numbers in an array", () => {
      expect(sum([-1, -2, -3])).toBe(-6); // => pass
    });
  });

  describe("factorial", () => {
    it("returns the correct factorial of a positive integer", () => {
      expect(factorial(5)).toBe(120); // => pass
    });

    it("returns 1 when 0 is given", () => {
      expect(factorial(0)).toBe(1); // => pass
    });

    it("returns 1 when 1 is given", () => {
      expect(factorial(1)).toBe(1); // => pass
    });
  });
});
