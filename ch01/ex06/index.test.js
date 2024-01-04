import { fib } from "./index.js";

describe("fib", () => {
  it("returns 5 for fib(5)", () => {
    expect(fib(5)).toBe(5); // => pass
  });

  it("returns 12586269025 for fib(50)", () => {
    expect(fib(50)).toBe(12586269025); // => pass
  });
});
