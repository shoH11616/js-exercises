import { fib } from "./index.js";

describe("fib", () => {
  it("returns 1 for the first call", () => {
    const gen = fib();
    expect(gen.next().value).toBe(1); // => pass
    // [prev, next]: [1, 1]
  });

  it("returns 1 for the second call", () => {
    const gen = fib();
    gen.next();
    // [prev, next]: [1, 1]
    expect(gen.next().value).toBe(1); // => pass
    // [prev, next]: [1, 2]
  });

  it("returns 2 for the third call", () => {
    const gen = fib();
    gen.next();
    // [prev, next]: [1, 1]
    gen.next();
    // [prev, next]: [1, 2]
    expect(gen.next().value).toBe(2); // => pass
    // [prev, next]: [2, 3]
  });
});
